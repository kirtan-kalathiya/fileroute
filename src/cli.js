const { VERSION } = require('./constants');
const { printTidyHelp, runTidy } = require('./commands/tidy');
const { printUndoHelp, runUndo } = require('./commands/undo');
const colors = require('./utils/colors');
const { promptUserAction, promptOrganizeOptions } = require('./utils/interactive');
const { startWatchMode } = require('./utils/watch');
const { createConfig, displayConfig } = require('./utils/config');
const fs = require('fs');
const path = require('path');

function looksLikePath(value) {
  return value.startsWith('.')
    || value.startsWith('~')
    || value.includes('/')
    || value.includes('\\')
    || path.isAbsolute(value);
}

function getTargetFlagValue(argv) {
  const index = argv.indexOf('--target');
  if (index === -1) {
    const positionalTarget = argv.find((value) => !value.startsWith('-'));
    return positionalTarget || process.cwd();
  }

  if (!argv[index + 1]) {
    throw new Error('Missing value for --target');
  }

  return argv[index + 1];
}

function printGlobalHelp() {
  console.log(`
${colors.header('📂 fileroute')} ${VERSION}

${colors.header('The easiest way to use it:')}
${colors.arrow('fileroute <folder>')}           Organize a folder now
${colors.arrow('route <folder>')}               Short alias for daily use
${colors.arrow('fileroute watch <folder>')}     Keep it clean automatically
${colors.arrow('fileroute undo <folder>')}      Restore the last run

${colors.header('Safe options:')}
${colors.bullet('fileroute preview <folder>')}  See changes before moving files
${colors.bullet('fileroute')}                   Open the quick menu

${colors.header('Examples:')}
${colors.arrow('route ~/Downloads')}
${colors.arrow('fileroute watch ~/Downloads')}
${colors.arrow('fileroute undo ~/Downloads')}

${colors.header('Short aliases:')}
${colors.bullet('route tidy')}           Same as organize
${colors.bullet('route sort')}           Same as organize
${colors.bullet('route fix')}            Same as organize
${colors.bullet('route config')}         Edit saved settings

${colors.header('Options:')}
${colors.bullet('--help, -h')}              Show help
${colors.bullet('--version')}               Show version
${colors.bullet('--dry-run')}               Preview changes
${colors.bullet('--target <path>')}         Specific folder
${colors.bullet('--config <file>')}         Load a config file
${colors.bullet('--verbose')}               Detailed output
${colors.bullet('--recursive')}             Include subfolders
`);
}

async function runInteractiveMode() {
  try {
    const action = await promptUserAction();

    switch (action) {
      case 'organize': {
        const opts = await promptOrganizeOptions();
        const args = [
          '--target', opts.targetDir,
          '--mode', opts.mode,
          ...(opts.recursive ? ['--recursive'] : []),
          ...(opts.verbose ? ['--verbose'] : []),
        ];
        runTidy(args, VERSION);
        break;
      }

      case 'dryrun': {
        const opts = await promptOrganizeOptions();
        const args = [
          '--target', opts.targetDir,
          '--mode', opts.mode,
          '--dry-run',
          ...(opts.recursive ? ['--recursive'] : []),
          ...(opts.verbose ? ['--verbose'] : []),
        ];
        runTidy(args, VERSION);
        break;
      }

      case 'undo': {
        const { targetDir } = await promptOrganizeOptions();
        runUndo(['--target', targetDir]);
        break;
      }

      case 'watch': {
        const { targetDir } = await promptOrganizeOptions();
        runWatchMode(targetDir);
        break;
      }

      case 'config': {
        const { targetDir } = await promptOrganizeOptions();
        await createConfig(targetDir);
        displayConfig(targetDir);
        break;
      }

      case 'exit':
        console.log(colors.info('Goodbye!'));
        process.exit(0);
        break;

      default:
        break;
    }
  } catch (error) {
    console.error(colors.error(`Error: ${error.message}`));
    process.exit(1);
  }
}

function runWatchMode(targetDir) {
  const resolvedTargetDir = path.resolve(targetDir);

  if (!fs.existsSync(resolvedTargetDir)) {
    throw new Error(`Target directory not found: ${resolvedTargetDir}`);
  }

  if (!fs.statSync(resolvedTargetDir).isDirectory()) {
    throw new Error(`Target path is not a directory: ${resolvedTargetDir}`);
  }

  startWatchMode(resolvedTargetDir, (dir) => {
    console.log(colors.info('Auto-organizing...'));
    runTidy(['--target', dir, '--verbose'], VERSION);
  });
}

async function run(argv) {
  if (argv.includes('--version') || argv.includes('-V')) {
    console.log(VERSION);
    return;
  }

  if (argv.length === 0) {
    await runInteractiveMode();
    return;
  }

  const [command, ...rest] = argv;

  if (command === '--help' || command === '-h' || command === 'help') {
    printGlobalHelp();
    return;
  }

  // Support command aliases for easier use
  const commandAliases = {
    'run': 'tidy',
    'tidy': 'tidy',
    'sort': 'tidy',
    'fix': 'tidy',
    'organize': 'tidy',
    'clean': 'tidy',
    'juggle': 'tidy',
    'fj': 'tidy',
    'undo': 'undo',
    'restore': 'undo',
    'preview': 'preview',
    'watch': 'watch',
    'config': 'config',
    'setup': 'config',
    'rules': 'config',
  };

  const normalizedCommand = commandAliases[command] || command;

  if (normalizedCommand === 'tidy') {
    runTidy(rest, VERSION);
    return;
  }

  if (normalizedCommand === 'preview') {
    // Preview mode: dry-run
    runTidy(['--dry-run', ...rest], VERSION);
    return;
  }

  if (normalizedCommand === 'undo' || normalizedCommand === 'restore') {
    runUndo(rest);
    return;
  }

  if (normalizedCommand === 'watch') {
    const targetDir = getTargetFlagValue(rest);
    runWatchMode(targetDir);
    return;
  }

  if (normalizedCommand === 'config') {
    const targetDir = getTargetFlagValue(rest);
    await createConfig(targetDir);
    displayConfig(targetDir);
    return;
  }

  if (looksLikePath(command)) {
    runTidy(['--target', command, ...rest], VERSION);
    return;
  }

  if (command.startsWith('-') || command.startsWith('--')) {
    runTidy(argv, VERSION);
    return;
  }

  console.error(colors.error(`Unknown command "${command}".`));
  printGlobalHelp();
  process.exit(1);
}

module.exports = {
  printTidyHelp,
  printUndoHelp,
  run,
};
