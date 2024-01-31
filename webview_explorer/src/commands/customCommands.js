const vscode = require('vscode');
function getChatBotHtml() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <body>
            <h1>Chat Bot testing</h1>
            <!-- Your chat bot code goes here -->
        </body>
        </html>
    `;
}

const openChatBot = vscode.commands.registerCommand('extension.openChatBot', () => {
    const panel = vscode.window.createWebviewPanel(
        'chatBot',
        'Chat Bot',
        vscode.ViewColumn.One,
        {}
    );

    panel.webview.html = getChatBotHtml();
});

module.exports = openChatBot;