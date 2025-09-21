const globals = require("globals");
const pluginJs = require("@eslint/js");
const pluginReactConfig = require("eslint-plugin-react/configs/recommended.js");
const { fixupConfigAsPlugin } = require("@eslint/compat");
const pluginTypeScript = require("@typescript-eslint/eslint-plugin");
const parserTypeScript = require("@typescript-eslint/parser");
const pluginPrettier = require("eslint-plugin-prettier");
const configPrettier = require("eslint-config-prettier");

module.exports = [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": fixupConfigAsPlugin(pluginTypeScript),
      react: fixupConfigAsPlugin(pluginReactConfig),
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginReactConfig.rules,
      ...pluginTypeScript.configs.recommended.rules,
      ...configPrettier.rules,
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^" }],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];