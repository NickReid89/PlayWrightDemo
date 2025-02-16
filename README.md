# PlayWrightDemo

This project is a demonstration of using Playwright for end-to-end testing of web applications.

## Prerequisites

- Node.js (>= 12.x)
- npm (>= 6.x) or yarn (>= 1.x)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/PlayWrightDemo.git
    cd PlayWrightDemo
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

## Usage

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



### Running Tests

To run the tests, use the following command:
```sh
npx playwright test
# or
yarn playwright test
```

### Writing Tests

Create your test files in the `tests` directory. Refer to the [Playwright documentation](https://playwright.dev/docs/intro) for more details on writing tests.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
