# PlayWrightDemo

This project is a demonstration of using Playwright for end-to-end testing of web applications.

## Prerequisites

- Node.js (>= 12.x)
- npm (>= 6.x)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/PlayWrightDemo.git
    cd PlayWrightDemo
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Usage

## Setting Up Visual Studio Code

To download and set up Visual Studio Code (VSCode) for running Playwright tests, follow these steps:

### Downloading and Installing VSCode

1. Go to the [Visual Studio Code website](https://code.visualstudio.com/).
2. Click on the "Download" button for your operating system.
3. Once the download is complete, run the installer and follow the on-screen instructions to install VSCode.

### Installing Needed Extensions

1. Open VSCode.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
3. Search for and install the following extensions:
    - **Playwright Test for VSCode**: Adds Playwright testing support.

### Running Tests within VSCode

1. Navigate to the dictory the project is in and issue the following command:
2. Open the project folder in VSCode:
    ```sh
    code .
    ```
2. Open the terminal in VSCode by going to `View` > `Terminal` or pressing `` Ctrl+` ``.
3. Run the tests using the following command:
    ```sh
    npx playwright test
    ```

You can also use the Playwright Test extension to run tests directly from the editor. On the side of the screen there's an icon that looks like a potion.
Click this, click refresh in the top right corner and you should see the tests populated locally. Assuming npm install has been run the tests should run. 

NOTE: If you get an error stating that browsers were not installed, issue the command ```npx playwright install``` and you should now have the required browsers for testing.

For more details on using VSCode, refer to the [VSCode documentation](https://code.visualstudio.com/docs).

### Running Tests with GitHub Actions

To run the tests using GitHub Actions, you can use the provided `playwright.yml` workflow file. This file is located in the `.github/workflows` directory of the repository.

The `playwright.yml` file is configured to automatically run the tests on every push and pull request. To manually trigger the tests, you can use the following command:

```sh
gh workflow run playwright.yml
```

Make sure you have the [GitHub CLI](https://cli.github.com/) installed and authenticated.

Alternatively, you can manually trigger the tests from the GitHub website:

1. Go to your repository on GitHub.
2. Click on the "Actions" tab.
3. Select the `playwright.yml` workflow from the list.
4. Click on the "Run workflow" button.

For more details on configuring GitHub Actions, refer to the [GitHub Actions documentation](https://docs.github.com/en/actions).

### Running Tests via terminal


1. Pull down the repo
2. Navigate to the directory
3. issue the command npm install
4. This should install the browsers for you. If not use the command ```npx playwright install```
5. To run the tests, use the following command:

```sh
npx playwright test
```

### Writing Tests

Create your test files in the `tests` directory. Refer to the [Playwright documentation](https://playwright.dev/docs/intro) for more details on writing tests.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
