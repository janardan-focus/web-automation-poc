**Automation Tests**

- **Overview**: This repo includes example automation scripts for end-to-end testing using Puppeteer and Playwright. The scripts live in the `automation/` folder and use `data-testid` attributes in the app to locate elements. Tests exercise inputs, selects, radios/checkboxes, file upload, Shadow DOM, and iframe interactions.

- **Files of interest**:

  - `automation/puppeteer-test.js`: Puppeteer-based example test.
  - `automation/playwright-test.js`: Playwright-based example test.
  - `automation/stagehand-test.js`: Stagehand-based example test.
  - `automation/fixtures/testfile.txt`: Sample file used for file upload in tests.

- **Prerequisites**: Node 18+ and the repo dependencies installed. On macOS with `zsh` these commands are copy-paste ready.

  - **Install deps**: `npm install`
  - **Start dev server**: `npm run dev` (opens Vite at `http://localhost:5173`)

- **Install browsers (Playwright)**: Playwright provides an install helper:

  - `npm run automation:install-browsers`

- **Run the example tests**:

  - **Puppeteer**: `npm run test:puppeteer`
  - **Playwright**: `npm run test:playwright`
  - **Stagehand**: `npm run test:stagehand`

  Both scripts expect the dev server to be running at `http://localhost:5173`. They launch headed browsers by default for easier debugging. To run headless, edit the `headless` option in the corresponding script.

- **Notes about the tests**:

  - Selectors rely on `data-testid` attributes in the React app (see `src/*`).
  - The tests demonstrate handling of dynamic content (waiting for selectors), Shadow DOM access, iframe interactions, and file uploads (the fixtures file is uploaded).
  - Playwright has built-in auto-waiting which the Playwright script leverages.

- **Troubleshooting**:
  - If Playwright fails due to missing browsers, run `npm run automation:install-browsers`.
  - If a selector is not found, open `http://localhost:5173` in your browser, inspect the element, and confirm the `data-testid` matches.
