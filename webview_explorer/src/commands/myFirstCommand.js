const vscode = require('vscode');

const myFirstCommand = vscode.commands.registerCommand('chat-with-mayank-chat.myFirstCommand', () => {
    console.log('My First Command executed successfully!');
    vscode.window.showInformationMessage('My First Command was executed!');
});

const customCmds = (context) => context.subscriptions.push(myFirstCommand);

module.exports = customCmds;
