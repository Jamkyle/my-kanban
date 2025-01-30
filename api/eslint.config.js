import eslint from '@eslint/js';
import typescriptParser from '@typescript-eslint/parser';
import nodePlugin from 'eslint-plugin-node';
import prettierPlugin from 'eslint-plugin-prettier';
import typescriptEslint from 'typescript-eslint';

export default [
  {
    ignores: ['**/*.js', '**/*.mjs'],
  },
  ...typescriptEslint.config(
    eslint.configs.recommended,
    ...typescriptEslint.configs.recommended,
  ),
  {
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      prettier: prettierPlugin,
      node: nodePlugin,
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },
];
