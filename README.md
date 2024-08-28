## RapidRun 🎯

**RapidRun** is a powerful Visual Studio Code extension that allows you to quickly compile and run code in multiple programming languages directly from your IDE. With support for C, C++, Python, JavaScript, Java, C#, and TypeScript, RapidRun enhances your productivity and streamlines your development workflow.

## 🚀 Features

- **Supports Multiple Languages**: Quickly run and compile code for C, C++, Python, JavaScript, Java, C#, and TypeScript.

- **Highly Customizable**: Configure compilers, interpreters, and flags to suit your specific project needs.

- **Fast Execution**: Compile and run your code with a single click or command, optimizing your workflow.

- **Status Bar Integration**: Seamlessly access the run functionality directly from the status bar for quick execution.

- **Smart Save Options**: Automatically save files before running based on your preferences (single, all, or none).

- **Terminal Integration**: View compilation and run outputs directly in the integrated terminal.

- **Error Handling**: Receive instant feedback on compilation errors, making debugging easier.

- **Cross-Platform Support**: Works on Windows, macOS, and Linux, providing a consistent experience across all platforms.


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
  "RapidRun.cppCompiler": "g++",
  "RapidRun.cppFlags": "-D_FORTIFY_SOURCE=2 -D_GLIBCXX_ASSERTIONS -std=c++23 -O2 -flto -pipe -Wall -Wextra -Wno-unused-parameter -Wno-unused-variable",
  "RapidRun.javaCompiler": "javac",
  "RapidRun.javaFlags": "",
  "RapidRun.pythonInterpreter": "python",
  "RapidRun.pythonFlags": "",
  "RapidRun.jsRuntime": "node",
  "RapidRun.jsFlags": "",
  "RapidRun.tsCompiler": "tsc",
  "RapidRun.tsFlags": "",
  "RapidRun.csharpCompiler": "dotnet run",
  "RapidRun.csharpFlags": "",
  "RapidRun.cFlags": "-D_FORTIFY_SOURCE=2 -D_GLIBCXX_ASSERTIONS -std=c++23 -O2 -flto -pipe -Wall -Wextra -Wno-unused-parameter -Wno-unused-variable",
  "RapidRun.cCompiler": "gcc",
  "RapidRun.saveBeforeRun":"single"
}
```
## 🚀 Usage

1.  **Open a Code File**: Ensure the file you want to run is currently open in the editor.

3.  **Run Your Code**:
    -   Click the `   Run Code 🟢   ` button in the status bar at the bottom left or Set keybinding
    -   Or use the command: Press `Ctrl+Shift+P` and search for `RapidRun: Run Code`.

### Example

If you have a `main.cpp` file open, clicking the `   Run Code 🟢   ` button or using the command will compile and run your C++ code using the settings you configured.
