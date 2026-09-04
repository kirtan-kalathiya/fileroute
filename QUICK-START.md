# 🚀 fileroute Quick Start Guide

**Route files to the right place — automatically.**

## ⚡ Fastest Way to Get Started

### 1️⃣ **Interactive Mode (Recommended)**
```bash
fileroute
```
or
```bash
route
```
Just run it and select what you want from the menu!

---

## 📋 Essential Commands

### Organize a Folder
```bash
fileroute ~/Downloads
fileroute ~/Desktop
route .
```

### Preview Before Moving
```bash
fileroute preview ~/Downloads
fileroute --dry-run ~/Downloads
```

### Undo Last Operation
```bash
fileroute undo ~/Downloads
```

### Watch & Auto-Organize
```bash
fileroute watch ~/Downloads
```
Files automatically sorted as they arrive.

### Create Custom Rules
```bash
fileroute config --target ~/Downloads
```

---

## 📖 Real-World Examples

### Scenario 1: Clean Downloads in One Command
```bash
fileroute ~/Downloads
```
✅ Done! Files organized by type (Documents, Images, Videos, Code, Archives, etc).

### Scenario 2: Preview Changes First
```bash
fileroute preview ~/Downloads
```
📋 See exactly what will move before anything happens.

### Scenario 3: "Oops, Undo That!"
```bash
fileroute undo ~/Downloads
```
↩️ All files restored to original locations.

### Scenario 4: Keep Downloads Auto-Organized
```bash
fileroute watch ~/Downloads
```
👀 New files automatically organized as they arrive.

### Scenario 5: Use Short Alias
```bash
route ~/Desktop
route --dry-run ~/Desktop
route undo ~/Desktop
```

---

## 🔧 All Command Options

### Global Options
```bash
fileroute <folder>              # Organize now
fileroute preview <folder>      # Preview changes
fileroute watch <folder>        # Auto-organize (watch mode)
fileroute undo <folder>         # Restore files
fileroute config --target <folder>  # Set custom rules
```

### Flags
```bash
--help, -h              Show help
--version               Show version
--dry-run               Preview changes
--target <path>         Specific folder (required for some commands)
--config <file>         Load a config file
--verbose               Detailed output
--recursive             Include subfolders
```

---

## 📦 Installation

### Install Globally (Recommended)
```bash
npm install -g fileroute
```

### Try Without Installing
```bash
npx fileroute ~/Downloads
```

### Local Development
```bash
npm install
npm start
```

---

## 💡 Tips & Tricks

- **Use aliases**: `route` is shorter than `fileroute`
- **Always preview first**: Use `--dry-run` to see changes before they happen
- **Watch mode**: Perfect for keeping Downloads clean automatically
- **Custom config**: Edit rules to organize your way
- **Undo anytime**: Every run saves a manifest, so you can always restore

---

---

## 🎯 Cheat Sheet

| What You Want | Command |
|---|---|
| Menu | `fileroute` or `route` |
| Organize | `fileroute ~/Downloads` |
| Preview | `fileroute --dry-run ~/Downloads` |
| Undo | `fileroute undo ~/Downloads` |
| Watch | `fileroute watch ~/Downloads` |
| Config | `fileroute config --target ~/Downloads` |
| Help | `fileroute --help` |

---

## 💡 Pro Tips

1. **Always preview first**
   ```bash
   fileroute --dry-run ~/Downloads
   fileroute ~/Downloads              # Then run for real
   ```

2. **Watch while working**
   ```bash
   fileroute watch --target ~/Downloads
   ```

3. **Save custom rules**
   ```bash
   fileroute config --target ~/Downloads
   # Customize, save, and it remembers!
   ```

4. **Show detailed output**
   ```bash
   fileroute ~/Downloads --verbose
   ```

---

## 🆘 Need Help?

```bash
fileroute --help              # General help
fileroute preview --help      # Preview help
fileroute undo --help         # Undo help
```

---

That's it! Keep your folders organized with fileroute! 🧹✨
