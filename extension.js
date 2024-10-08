'use strict';
const vscode = require ('vscode');
const path = require ('path');

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
 * Retrieves or updates configuration settings.
 * @returns {vscode.WorkspaceConfiguration} The configuration settings.
 */
let configCache = null;

const getConfig = () => {
  if (configCache) {
    return configCache;
  }
  configCache = vscode.workspace.getConfiguration ('RapidRun');
  return configCache;
};

/**
 * Updates the configuration cache.
 */
const updateConfigCache = () => {
  configCache = vscode.workspace.getConfiguration ('RapidRun');
};

/**
 * Saves files based on the configured option.
 */
const saveFiles = async () => {
  const config = getConfig ();
  const saveOption = config.get ('saveBeforeRun');

  if (saveOption === 'single') {
    await vscode.commands.executeCommand ('workbench.action.files.save');
  } else if (saveOption === 'all') {
    await vscode.commands.executeCommand ('workbench.action.files.saveAll');
  }
};

/**
 * Compiles and runs the code based on the file extension.
 * @param {string} filePath - The full path of the file.
 * @param {string} fileName - The name of the file without the extension.
 * @param {string} fileExt - The file extension.
 * @param {vscode.WorkspaceConfiguration} config - The configuration settings.
 */
const runCode = (filePath, fileName, fileExt, config) => {
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
    '.js': config.get ('javascriptFlags'),
    '.ts': config.get ('typescriptFlags'),
  };

  const compiler = compilers[fileExt];
  if (!compiler) {
    vscode.window.showErrorMessage ('No compiler set.');
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
  terminal.sendText (runCommand);
};

/**
 * Activates the extension.
 * @param {vscode.ExtensionContext} context
 */
const activate = context => {
  updateConfigCache ();
  vscode.workspace.onDidChangeConfiguration (event => {
    if (event.affectsConfiguration ('RapidRun')) {
      updateConfigCache ();
    }
  });

  // Status bar button
  const runButton = vscode.window.createStatusBarItem (
    vscode.StatusBarAlignment.Left,
    0
  );
  runButton.text = '   Run Code 🟢   ';
  runButton.command = 'RapidRun.runner';
  runButton.tooltip = 'Run current code';
  runButton.show ();

  context.subscriptions.push (
    runButton,
    vscode.commands.registerCommand ('RapidRun.runner', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage ('No active editor found.');
        return;
      }

      const fileUri = editor.document.uri;
      const fileExt = path.extname (fileUri.fsPath).toLowerCase ();
      const filePath = path.normalize (fileUri.fsPath);
      const fileName = path.basename (fileUri.fsPath, fileExt);
      const config = getConfig ();

      await saveFiles ();
      runCode (filePath, fileName, fileExt, config);
    })
  );
};

const deactivate = () => {};

module.exports = {activate, deactivate};
