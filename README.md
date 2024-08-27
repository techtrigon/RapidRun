# RapidRun 🎯

**RapidRun** is a powerful Visual Studio Code extension that allows you to quickly compile and run code in multiple programming languages directly from your IDE. With support for C, C++, Python, JavaScript, Java, C#, and TypeScript, RapidRun enhances your productivity and streamlines your development workflow.

![RapidRun Logo](./RapidRun.png)

## 🚀 Features

- **Supports Multiple Languages**: Quickly run code for C, C++, Python, JavaScript, Java, C#, and TypeScript.
- **Highly Customizable**: Configure compilers and interpreters as per your needs.
- **Fast Execution**: Compile and run code with a single click or command.
- **Status Bar Integration**: Easily access the run functionality via the status bar.

## 💻 Installation

### In VSCode

1. Open **Visual Studio Code**.

2. Go to **Extensions** (Ctrl+Shift+X).

3. Search for **"RapidRun"**.

5. Click **Install**.

## ⚙️ Configuration

Configure the compilers and interpreters in your `settings.json` file:

1. **Open Settings**:
   - Go to **File** > **Preferences** > **Settings** (or press `Ctrl+,`).

2. **Search for "RapidRun"**:
   - In the search bar, type `"RapidRun"` to view the configuration options.

3. **Modify Configuration**:
   - Add or update the following settings in your `settings.json` file:

```json
{
  "RapidRun.cCompiler": "gcc",
  "RapidRun.cppCompiler": "g++",
  "RapidRun.javaCompiler": "javac",
  "RapidRun.pythonInterpreter": "python",
  "RapidRun.csharpCompiler": "dotnet run",
  "RapidRun.jsRuntime": "node",
  "RapidRun.tsCompiler": "tsc",
  "RapidRun.cFlags": [
    "-pipe",
    "-D_FORTIFY_SOURCE=2",
    "-D_GLIBCXX_ASSERTIONS",
    "-Wall",
    "-Wextra",
    "-O2",
    "-flto",
    "-std=c17"
  ],
  "RapidRun.cppFlags": [
    "-pipe",
    "-D_FORTIFY_SOURCE=2",
    "-D_GLIBCXX_ASSERTIONS",
    "-Wall",
    "-Wextra",
    "-O2",
    "-flto",
    "-std=c++23"
  ],
  "RapidRun.javaFlags": [],
  "RapidRun.pythonFlags": [],
  "RapidRun.csharpFlags": [],
  "RapidRun.jsFlags": [],
  "RapidRun.tsFlags": []
}
```
## 🚀 Usage

1.  **Open a Code File**: Ensure the file you want to run is currently open in the editor.

3.  **Run Your Code**:
    -   Click the `Run 🟢` button in the status bar at the bottom left.
    -   Or use the command: Press `Ctrl+Shift+P` and search for `RapidRun: Run Code`.

### Example

If you have a `main.cpp` file open, clicking the `Run 🟢` button or using the command will compile and run your C++ code using the settings you configured.
