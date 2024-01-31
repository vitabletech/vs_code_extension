# Calico Colors VSCode Extension

This extension provides a color picker view for easily inserting color codes into your code.

## Features

- Add and manage colors in a visual interface.
- Insert selected colors directly into your code.

## Usage

1. Open the Calico Colors view by clicking on the "Colors" icon in the Activity Bar.
2. Use the "Add Color" button to add new colors to the list.
3. Click on a color to insert its code into the active text editor.

## Commands

- `calicoColors.addColor`: Opens the color picker to add a new color.
- `calicoColors.clearColors`: Clears all colors from the list.

## Requirements

This extension requires Visual Studio Code version 1.60.0 or higher.

## Extension Settings

None

## Known Issues

No known issues at the moment.

## Release Notes

### 1.0.0

Initial release of Calico Colors.

## VS Code API

### `vscode` module

- [`window.registerWebviewViewProvider`](https://code.visualstudio.com/api/references/vscode-api#window.registerWebviewViewProvider)

## Running the example

- Open this example in VS Code 1.49+
- `npm install`
- `npm run watch` or `npm run compile`
- `F5` to start debugging

In the explorer, expand the `Calico Colors` view.