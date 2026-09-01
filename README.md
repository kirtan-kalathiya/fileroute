# fileroute

> Route files to the right place — automatically.

**fileroute** organizes messy folders with a single command. Set up once and it sorts files into clean folders like `Documents`, `Images`, `Videos`, `Archives`, and `Code`. Preview changes before anything moves, undo in one command, and keep folders clean automatically with watch mode.

## Install

```bash
npm install -g fileroute
```

Or try without installing:

```bash
npx fileroute
```

## Use it in one second

```bash
# Quick and easy
route ~/Downloads

# Keep it clean automatically
fileroute watch ~/Downloads

# Undo the last run
fileroute undo ~/Downloads
```

Preview before moving:

```bash
fileroute preview ~/Downloads
```

## What it does

- Routes files into clean folders automatically (Documents, Images, Videos, Archives, Code…)
- Works with Downloads, Desktop, projects, and any messy folder
- Shows a preview before moving files — nothing happens until you say so
- Saves undo history after every real run
- Handles duplicate file names safely without overwriting
- Watch mode keeps folders organized as new files arrive
- Config file support for per-folder settings

## Advanced use

```bash
fileroute run ~/Downloads --mode name --dry-run
fileroute run ~/Desktop --recursive --exclude "*.tmp,node_modules"
fileroute config ~/Downloads
```

Run `fileroute --help` for the full command reference.

## Commands

| Command | What it does |
|---|---|
| `fileroute <folder>` | Organize a folder now |
| `fileroute preview <folder>` | Preview changes (safe) |
| `fileroute watch <folder>` | Auto-organize as files arrive |
| `fileroute undo <folder>` | Restore previous state |
| `fileroute config <folder>` | Set per-folder options |

## Development

```bash
npm test
```

The marketing site lives in [`website/`](website/).

## License

MIT — by [kirtan kalathiya](https://github.com/kirtan-kalathiya)
