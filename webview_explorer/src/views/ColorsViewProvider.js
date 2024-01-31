const vscode = require("vscode");
const { getNonce } = require("../util");

const ColorsView = (context) => {
  const provider = new ColorsViewProvider(context.extensionUri);

  context.subscriptions.push(
  vscode.window.registerWebviewViewProvider(
      ColorsViewProvider.viewType,
      provider
  )
  );

  context.subscriptions.push(
  vscode.commands.registerCommand("calicoColors.addColor", () => {
      provider.addColor();
  })
  );

  context.subscriptions.push(
  vscode.commands.registerCommand("calicoColors.clearColors", () => {
      provider.clearColors();
  })
  );
}

class ColorsViewProvider {
  static get viewType() {
    return "calicoColors.colorsView";
  }

  constructor(_extensionUri) {
    this._extensionUri = _extensionUri;
  }

  resolveWebviewView(webviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage((data) => {
      switch (data.type) {
        case "colorSelected": {
          vscode.window.activeTextEditor?.insertSnippet(
            new vscode.SnippetString(`#${data.value}`)
          );
          break;
        }
      }
    });
  }

  addColor() {
    if (this._view) {
      this._view.show?.(true);
      this._view.webview.postMessage({ type: "addColor" });
    }
  }

  clearColors() {
    if (this._view) {
      this._view.webview.postMessage({ type: "clearColors" });
    }
  }
  
  _getHtmlForWebview(webview) {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "main.js")
    );
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
    );
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
    );
    const styleMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "main.css")
    );
    const nonce = getNonce();

    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="${styleResetUri}" rel="stylesheet">
                <link href="${styleVSCodeUri}" rel="stylesheet">
                <link href="${styleMainUri}" rel="stylesheet">
                <title>Cat Colors</title>
            </head>
            <body>
                <ul class="color-list"></ul>
                <button class="add-color-button">Add Color</button>
                <script nonce="${nonce}" src="${scriptUri}"></script>
            </body>
            </html>`;
  }
}

module.exports = ColorsView;