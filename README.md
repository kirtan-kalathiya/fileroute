# 📁 fileroute

> **Route files to the right place — automatically.**

[![npm version](https://img.shields.io/npm/v/fileroute.svg?color=blue)](https://www.npmjs.com/package/fileroute)
[![license](https://img.shields.io/npm/l/fileroute.svg?color=green)](LICENSE)
[![node version](https://img.shields.io/node/v/fileroute.svg)](package.json)

**fileroute** is a fast, lightweight, and intelligent command-line tool that automatically organizes messy directories into clean, structured subfolders. Set it up once, and it routes files like documents, images, videos, audio, code, and archives into their appropriate places. 

Features include **Watch Mode (Auto-Organize)** for real-time file organization, **Dry-Run Previews** to inspect changes safely, **One-Command Undo** to revert operations anytime, and **Per-Folder Configurations**.

---

## 📑 Table of Contents

- [Package Overview](#-package-overview)
- [Package Description](#-package-description)
- [Download & Installation](#-download--installation)
- [Initial Setup & Configuration Wizard](#-initial-setup--configuration-wizard)
- [Auto-Organize / Watch Mode](#-auto-organize--watch-mode)
- [All Available Commands](#-all-available-commands)
- [Practical Examples](#-practical-examples)
- [Folder Organization Structure](#-folder-organization-structure)
- [Configuration Reference](#-configuration-reference)
- [Safety & Undo System](#-safety--undo-system)
- [Troubleshooting](#-troubleshooting)
- [Frequently Asked Questions (FAQ)](#-frequently-asked-questions-faq)
- [Development & Testing](#-development--testing)
- [Package Publishing & Metadata](#-package-publishing--metadata)
- [License](#-license)

---

## 📦 Package Overview

### What it is
`fileroute` (also accessible via the short command `route`) is an automated file router and folder organizer built with Node.js.

### What Problem it Solves
Over time, folders like `Downloads`, `Desktop`, and shared workspaces become cluttered with thousands of unorganized files (PDFs, screenshots, video clips, installers, archives). Finding specific files manually is frustrating and time-consuming. `fileroute` organizes these folders instantly in a single command or monitors them continuously in the background.

### Key Highlights
- 📂 **Smart File Classification**: Automatically routes files into standard category folders (`Documents`, `Images`, `Videos`, `Audio`, `Code`, `Archives`, `Installers`, `Fonts`, `Design`, `Data`).
- 👀 **Continuous Watch Mode**: Automatically detects newly created or downloaded files and moves them instantly.
- 🔍 **Safe Previews**: Dry-run mode (`preview`) shows planned moves without altering your filesystem.
- ↩️ **One-Command Undo**: Every operation writes an undo manifest allowing instant restoration.
- 🛡️ **Duplicate File Protection**: Handles naming collisions safely by appending numbers (e.g. `file (1).pdf`) instead of overwriting existing files.
- ⚙️ **Per-Folder Settings**: Customize organization rules, exclusion globs, and default modes per directory.

### Who it is for
- **Developers & Designers**: Keep workspace directories and asset downloads clean.
- **Students & Professionals**: Keep documents, invoices, spreadsheets, and slides structured.
- **Power Users**: Automate continuous cleanup on `Downloads` or `Desktop` folders.

---

## 📝 Package Description

`fileroute` transforms chaotic folders into clean, categorized hierarchies based on customizable rule engines:

1. **Extension Categorization (`--mode type`)**: Maps file extensions (`.pdf`, `.jpg`, `.mp4`, `.zip`, `.js`) to designated target folders (`Documents`, `Images`, `Videos`, `Archives`, `Code`).
2. **Pattern & Keyword Matching (`--mode name`)**: Detects keywords like `screenshot`, `invoice`, `setup`, `backup`, `presentation` in filenames and routes them to specialized folders.
3. **Date Organization (`--mode date`)**: Groups files into year and month folders based on file modification timestamps (`2026/09`).

---

## 📥 Download & Installation

### Prerequisites
- **Node.js**: Version `16.0.0` or higher.
- **Operating System**: Compatible with Windows, macOS, and Linux.

### Global Installation (Recommended)
Install `fileroute` globally using `npm` to make the `fileroute` and `route` commands available anywhere in your terminal:

```bash
npm install -g fileroute
```

### Try Without Installing (`npx`)
Run `fileroute` directly without installing:

```bash
npx fileroute ~/Downloads
```

---

## ⚙️ Initial Setup & Configuration Wizard

To configure `fileroute` for any target directory, run the interactive setup wizard:

```bash
fileroute setup ~/Downloads
```

Or run setup for the current folder:

```bash
fileroute setup
```

### Setup Options Walkthrough

When you run `fileroute setup`, the CLI presents the following interactive options:

1. **“Do you want to automatically organize your files?”**
   - **Selecting `Yes`**: Enables **Auto-Organize / Watch Mode**. Saves `"autoWatch": true` in `.fileroute-config.json` and immediately launches continuous background folder monitoring.
   - **Selecting `No`**: Saves `"autoWatch": false`. `fileroute` runs only when explicitly triggered by you.

2. **“Default organize mode:”**
   - `File type` (categorizes by file extension into `Documents`, `Images`, `Videos`, etc.)
   - `File name pattern` (categorizes by keywords like `screenshot`, `invoice`, `backup`)
   - `Modified date` (categorizes by `YYYY/MM` folders)

3. **“Scan subfolders by default?”** (`recursive`)
   - Controls whether `fileroute` inspects subdirectories recursively.

4. **“Include hidden files?”** (`includeHidden`)
   - Controls whether dotfiles (e.g. `.gitignore`) are included.

5. **“Auto-save undo manifest?”** (`autoUndo`)
   - Generates manifest history files after every non-dry-run operation for undo capability.

---

## 👀 Auto-Organize / Watch Mode

### How Watch Mode Works
When Auto-Organize / Watch Mode is activated, `fileroute` monitors the target directory using `chokidar`. As soon as a new file finishes downloading or saving into the folder, `fileroute` detects it automatically and routes it to the correct category subfolder.

### Automated Routing Examples

| Incoming File | Detected Extension / Pattern | Destination Subfolder |
| :--- | :--- | :--- |
| `report_2026.pdf` | `.pdf` (Document) | `Documents/report_2026.pdf` |
| `vacation_photo.jpg` | `.jpg` (Image) | `Images/vacation_photo.jpg` |
| `tutorial_video.mp4` | `.mp4` (Video) | `Videos/tutorial_video.mp4` |
| `backup_data.zip` | `.zip` (Archive) | `Archives/backup_data.zip` |
| `installer_setup.exe` | `.exe` (Installer) | `Installers/installer_setup.exe` |
| `script.js` | `.js` (Code) | `Code/script.js` |
| `Screen Shot 2026.png` | `screenshot` pattern | `Screenshots/Screen Shot 2026.png` |

### Controlling Watch Mode
- **Start Watch Mode directly**: `fileroute watch ~/Downloads`
- **Stop Watch Mode**: Press `Ctrl + C` in the terminal running Watch Mode.

---

## 🛠️ All Available Commands

`fileroute` provides several CLI commands and short aliases (`route` is an exact alias for `fileroute`).

### 1. `fileroute setup [folder]`
Runs the interactive setup wizard and prompts for Auto-Organize configuration.
```bash
fileroute setup ~/Downloads
```

### 2. `fileroute [folder]` / `fileroute run [folder]`
Organizes the target directory immediately based on active or default rules.
```bash
fileroute ~/Downloads
# Or short alias
route ~/Downloads
```

### 3. `fileroute preview [folder]` / `fileroute --dry-run [folder]`
Simulates file organization and displays proposed changes without moving any files.
```bash
fileroute preview ~/Downloads
```

### 4. `fileroute watch [folder]`
Starts Watch Mode to monitor a directory continuously and organize incoming files on arrival.
```bash
fileroute watch ~/Downloads
```

### 5. `fileroute undo [folder]`
Restores files moved during the last organization run back to their original locations.
```bash
fileroute undo ~/Downloads
```

### 6. `fileroute config [folder]`
Views or edits per-folder settings saved in `.fileroute-config.json`.
```bash
fileroute config ~/Downloads
```

---

### Command Flags & Options Reference

| Flag / Option | Description | Example |
| :--- | :--- | :--- |
| `--target <path>` | Specifies the target directory | `fileroute --target ~/Desktop` |
| `--mode <type\|name\|date>` | Sets organization mode (`type`, `name`, `date`) | `fileroute ~/Downloads --mode date` |
| `--dry-run` | Previews changes without moving files | `fileroute run ~/Downloads --dry-run` |
| `--recursive` | Scans subdirectories recursively | `fileroute run ~/Desktop --recursive` |
| `--exclude <globs>` | Excludes matching files/folders (comma-separated) | `fileroute run ~/Downloads --exclude "*.tmp,node_modules"` |
| `--include-hidden` | Includes hidden files/dotfiles | `fileroute run ~/Downloads --include-hidden` |
| `--no-manifest` | Disables manifest creation (prevents undo) | `fileroute run ~/Downloads --no-manifest` |
| `--report <path>` | Saves a JSON summary report to specified path | `fileroute run ~/Downloads --report report.json` |
| `--verbose` | Displays detailed logging output | `fileroute run ~/Downloads --verbose` |
| `--help`, `-h` | Displays global or command-specific help | `fileroute --help` |
| `--version`, `-V` | Displays installed package version | `fileroute --version` |

---

## 💡 Practical Examples

### Scenario 1: Clean Downloads in One Command
```bash
fileroute ~/Downloads
```
*Result*: Files are scanned and organized into category folders immediately.

### Scenario 2: Preview Changes Safely Before Moving
```bash
fileroute preview ~/Downloads
```
*Result*: Outputs a dry-run plan showing exact proposed moves without altering files.

### Scenario 3: Accidental Move? Undo Instantly
```bash
fileroute undo ~/Downloads
```
*Result*: Reverts the previous run and restores all moved files back to their exact original locations.

### Scenario 4: Monitor Downloads Automatically
```bash
fileroute watch ~/Downloads
```
*Result*: Launches Watch Mode. Leave the process active in your terminal or background to auto-organize new downloads as soon as they arrive.

---

## 📂 Folder Organization Structure

### Before Organization:
```text
Downloads/
├── invoice_2026.pdf
├── screenshot_1.png
├── holiday_photo.jpg
├── demo_video.mp4
├── archive_files.zip
└── setup_installer.exe
```

### After `fileroute ~/Downloads`:
```text
Downloads/
├── Documents/
│   └── invoice_2026.pdf
├── Images/
│   └── holiday_photo.jpg
├── Screenshots/
│   └── screenshot_1.png
├── Videos/
│   └── demo_video.mp4
├── Archives/
│   └── archive_files.zip
└── Installers/
    └── setup_installer.exe
```

---

## ⚙️ Configuration Reference

When setup or config commands are executed, `fileroute` creates a `.fileroute-config.json` file inside the target directory:

```json
{
  "version": "1.0.0",
  "mode": "type",
  "recursive": false,
  "includeHidden": false,
  "excludePatterns": [],
  "autoUndo": true,
  "autoWatch": true,
  "dryRunByDefault": false
}
```

### Configuration Options Breakdown
- **`version`**: Schema version.
- **`mode`**: Default organize mode (`type`, `name`, `date`).
- **`recursive`**: Whether subfolders are scanned recursively (`true`/`false`).
- **`includeHidden`**: Whether dotfiles are scanned (`true`/`false`).
- **`autoUndo`**: Whether undo manifests are created (`true`/`false`).
- **`autoWatch`**: Whether Watch Mode starts automatically after setup (`true`/`false`).
- **`excludePatterns`**: Array of glob strings to ignore.

---

## 🛡️ Safety & Undo System

`fileroute` prioritizes data safety:

1. **Non-Destructive Operations**: Files are moved, never deleted.
2. **Duplicate Naming Safeguard**: If `Documents/report.pdf` already exists, an incoming file is renamed to `Documents/report (1).pdf`.
3. **Manifest History**: Real runs record file moves inside `.fileroute/manifest-<timestamp>.json`.
4. **Instant Restoration**: `fileroute undo` reads the latest manifest and safely restores every moved file.
5. **Project File Isolation**: `fileroute` skips project configurations (`package.json`, `index.js`, `README.md`, `.git`) automatically to prevent self-disruption.

---

## ❓ Troubleshooting

### 1. `command not found: fileroute`
- Ensure Node.js is installed.
- Re-run `npm install -g fileroute` or run via `npx fileroute`.

### 2. Files not moving / skipped
- Run with `--verbose` flag (`fileroute ~/Downloads --verbose`) to inspect skip reasons.
- Verify if files match an `--exclude` pattern or are already inside a managed category folder (`Documents`, `Images`, etc.).

### 3. Permission Errors
- Ensure your user account has write permissions for the target directory.

### 4. How to Reset Directory Configuration
- Delete the `.fileroute-config.json` file in the folder and run `fileroute setup` again.

---

## 💬 Frequently Asked Questions (FAQ)

**Q: Does `fileroute` delete any of my files?**  
*A: No. `fileroute` only moves files into subfolders and protects against overwriting duplicates.*

**Q: How do I stop Watch Mode?**  
*A: Press `Ctrl + C` in the terminal window running Watch Mode.*

**Q: Can I use `route` instead of typing `fileroute`?**  
*A: Yes! `route` is an official short alias installed with the package.*

**Q: Can I customize file categories?**  
*A: Yes, per-folder settings can be configured via `fileroute config` or by editing `.fileroute-config.json`.*

---

## 🧪 Development & Testing

Contributions and local development instructions:

### Clone & Install Dependencies
```bash
git clone https://github.com/kirtan-kalathiya/fileroute.git
cd fileroute
npm install
```

### Run Tests
```bash
npm test
```

---

## 📌 Package Publishing & Metadata

- **npm Package**: [`fileroute`](https://www.npmjs.com/package/fileroute)
- **Repository**: [github.com/kirtan-kalathiya/fileroute](https://github.com/kirtan-kalathiya/fileroute)
- **Homepage**: [fileroute.dev](https://fileroute.dev/)
- **CLI Executables**: `fileroute`, `route`

---

## 📄 License

Distributed under the **MIT License**. Created by [kirtan kalathiya](https://github.com/kirtan-kalathiya).