const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const importPlugin = require('eslint-plugin-import');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

module.exports = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // ================= SORT IMPORTS =================
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. React и React Native
            ['^react$', '^react-native$', '^@react-'],

            // 2. Остальные пакеты из node_modules
            ['^@expo', '^\\w'],

            // 3. Относительные импорты (./ или ../), кроме папок types
            ['^(?!.*types).*\\.'],

            // 4. Любые импорты, содержащие /types — всегда внизу
            ['.*/types.*'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-duplicates': 'error',

      // ================= TYPESCRIPT =================
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
      'no-unused-vars': 'off',

      // ================= REACT =================
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-boolean-value': ['warn', 'always'],
      'react/jsx-key': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // ================= GENERAL =================
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-console': 'warn',
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': { typescript: { project: './tsconfig.json' } },
    },
  },
];
