# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

**Automation Tests**

- **Overview**: This repo includes example automation scripts for end-to-end testing using Puppeteer and Playwright. The scripts live in the `automation/` folder and use `data-testid` attributes in the app to locate elements. Tests exercise inputs, selects, radios/checkboxes, file upload, Shadow DOM, and iframe interactions.

- **Files of interest**:
  - `automation/puppeteer-test.js`: Puppeteer-based example test.
  - `automation/playwright-test.js`: Playwright-based example test.
  - `automation/fixtures/testfile.txt`: Sample file used for file upload in tests.

- **Prerequisites**: Node 18+ and the repo dependencies installed. On macOS with `zsh` these commands are copy-paste ready.

  - **Install deps**: `npm install`
  - **Start dev server**: `npm run dev` (opens Vite at `http://localhost:5173`)

- **Install browsers (Playwright)**: Playwright provides an install helper:

  - `npm run automation:install-browsers`

- **Run the example tests**:

  - **Puppeteer**: `npm run test:puppeteer`
  - **Playwright**: `npm run test:playwright`

  Both scripts expect the dev server to be running at `http://localhost:5173`. They launch headed browsers by default for easier debugging. To run headless, edit the `headless` option in the corresponding script.

- **Notes about the tests**:
  - Selectors rely on `data-testid` attributes in the React app (see `src/*`).
  - The tests demonstrate handling of dynamic content (waiting for selectors), Shadow DOM access, iframe interactions, and file uploads (the fixtures file is uploaded).
  - Playwright has built-in auto-waiting which the Playwright script leverages.

- **Troubleshooting**:
  - If Playwright fails due to missing browsers, run `npm run automation:install-browsers`.
  - If a selector is not found, open `http://localhost:5173` in your browser, inspect the element, and confirm the `data-testid` matches.

