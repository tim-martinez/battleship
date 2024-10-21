import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    files: ['src/**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: {
      import: eslintPluginImport,
      promise: eslintPluginPromise,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...eslintConfigPrettier.rules, // Prettier rules directly
      'prettier/prettier': 'error', // Ensures Prettier's rules are enforced
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'import/no-unresolved': 'error',
      'promise/always-return': 'warn',
      'promise/no-return-wrap': 'warn',
      quotes: ['error', 'single', { avoidEscape: true }], // Enforce single quotes, allow escaping
    },
  },
];
