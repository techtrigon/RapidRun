'use strict';
const vscode = require ('vscode');
const path = require ('path');
// const punycode = require ('punycode/');

/**
 * Retrieves or creates a terminal with a specific name.
 * @returns {vscode.Terminal} The terminal instance.
 */
const getTerminal = () => {
  let terminal = vscode.window.activeTerminal;
  if (!terminal) {
    terminal = vscode.window.createTerminal ('Code');
  }
  return terminal;
};

/**
 * Retrieve and cache configuration settings.
 * @returns {object} The configuration settings.
 */

const getConfig = (() => {
  let configCache = null;
  return () => {
    if (configCache) {
      return configCache;
    }
    configCache = vscode.workspace.getConfiguration ('RapidRun');
    return configCache;
  };
}) ();

/**
 * Compiles and runs the code based on the file extension.
 * @param {string} filePath - The full path of the file.
 * @param {string} fileName - The name of the file without the extension.
 * @param {string} fileExt - The file extension.
 */

const runCode = (filePath, fileName, fileExt) => {
  const config = getConfig ();

  const compilers = {
    '.c': config.get ('cCompiler'),
    '.cpp': config.get ('cppCompiler'),
    '.cs': config.get ('csharpCompiler'),
    '.java': config.get ('javaCompiler'),
    '.py': config.get ('pythonInterpreter'),
    '.js': config.get ('jsRuntime'),
    '.ts': config.get ('tsCompiler'),
  };

  const flags = {
    '.c': config.get ('cFlags'),
    '.cpp': config.get ('cppFlags'),
    '.java': config.get ('javaFlags'),
    '.py': config.get ('pythonFlags'),
    '.cs': config.get ('csharpFlags'),
    '.js': config.get ('jsFlags'),
    '.ts': config.get ('tsFlags'),
  };

  const compiler = compilers[fileExt];
  if (!compiler) {
    vscode.window.showErrorMessage (
      'File type not supported or no compiler set.'
    );
    return;
  }

  const location = path.dirname (filePath);
  let runCommand;

  switch (fileExt) {
    case '.c':
    case '.cpp':
      runCommand = `${compiler} ${flags[fileExt]} "${filePath}" -o "OUTPUT.exe" && ./"OUTPUT.exe"`;
      break;
    case '.java':
      runCommand = `${compiler} ${flags[fileExt]} "${filePath}" && java "${fileName}"`;
      break;
    case '.ts':
      runCommand = `${config.get ('tsCompiler')} ${flags[fileExt]} "${filePath}" && ${config.get ('jsRuntime')} "${fileName}.js"`;
      break;
    default:
      runCommand = `${compiler} ${flags[fileExt]} "${filePath}"`;
  }

  const terminal = getTerminal ();
  terminal.show ();
  terminal.sendText (`cd "${location}" && ${runCommand}`);
};

/**
 * Activates the extension.
 * @param {vscode.ExtensionContext} context - The extension context.
 */

const activate = context => {
  //   console.time ('Extension Startup Time');
  const runButton = vscode.window.createStatusBarItem (
    vscode.StatusBarAlignment.Left,
    80
  );
  runButton.text = 'Run 🟢';
  runButton.command = 'RapidRun.runner';
  runButton.tooltip = 'Run current code';
  runButton.show ();

  context.subscriptions.push (
    runButton,
    vscode.commands.registerCommand ('RapidRun.runner', () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage ('No active editor found.');
        return;
      }
      const fileUri = editor.document.uri;
      const fileExt = path.extname (fileUri.fsPath).toLowerCase ();
      const filePath = path.normalize (fileUri.fsPath);
      const fileName = path.basename (fileUri.fsPath, fileExt);
      runCode (filePath, fileName, fileExt);
    })
  );
  //   console.timeEnd ('Extension Startup Time');
};

const deactivate = () => {};

module.exports = {activate, deactivate};
