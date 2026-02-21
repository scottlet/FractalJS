// eslint-disable-next-line import-x/no-named-as-default
import jsdoc from 'eslint-plugin-jsdoc';
import importPlugin from 'eslint-plugin-import-x';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

import globals from 'globals';

import js from '@eslint/js';

export default [
  jsdoc.configs['flat/recommended'],

  // eslint-disable-next-line import-x/no-named-as-default-member
  importPlugin.flatConfigs.recommended,
  js.configs.recommended,
  {
    ignores: [
      '**/app/**/*',
      'docs/**/*',
      '**/deploy/**/*',
      '**/bin/**/*',
      'server/modules/rc4.js',
      '**/node_modules/**/*',
      'node_modules/**/*',
      '**/.runtime/**/*',
      'gulpfile.mjs/**/*',
      'assets/**/*',
    ],
  },
  {
    plugins: {
      'import-x': importPlugin,
      jsdoc,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      'import-x/resolver': {
        node: {
          extensions: ['.js', '.json'],
        },
        'eslint-import-resolver-custom-alias': {
          alias: {
            '@': './src',
          },
          extensions: ['.js', '.json'],
        },
      },
    },

    rules: {
      'no-use-before-define': 0,
      'no-shadow': 2,
      'comma-dangle': 2,

      'import-x/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'always',
        },
      ],

      'import-x/prefer-default-export': 0,

      'import-x/no-unresolved': [
        2,
        {
          commonjs: false,
        },
      ],

      'keyword-spacing': 2,
      'linebreak-style': [1, 'unix'],
      'no-empty-function': 2,
      'no-extra-semi': 2,

      'no-magic-numbers': [
        2,
        {
          enforceConst: true,
          ignoreArrayIndexes: true,

          ignore: [
            -2, -1, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0, 1, 2, 3, 4,
            5, 6, 7, 8, 9, 10, 16, 24, 48, 50, 60, 100, 255, 256, 500, 512,
            1000,
          ],
        },
      ],

      indent: 0,
      'no-console': 2,
      'no-multiple-empty-lines': 2,
      'no-nested-ternary': 0,
      'no-trailing-spaces': 2,
      'no-underscore-dangle': [
        2,
        { allow: ['__dirname', '__filename', '_id', '__', '_csrf'] },
      ],

      'no-unused-expressions': [
        2,
        {
          allowTernary: true,
        },
      ],

      'no-unused-vars': 2,
      'no-var': 2,
      'object-curly-spacing': [2, 'always'],
      'object-shorthand': 2,
      'one-var': [2, 'never'],

      'padding-line-between-statements': [
        2,
        {
          blankLine: 'always',
          prev: ['multiline-expression', 'block-like'],
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: ['multiline-expression', 'block-like'],
        },
        {
          blankLine: 'always',
          prev: ['var', 'const', 'let'],
          next: '*',
        },
        {
          blankLine: 'any',
          prev: ['var', 'const', 'let'],
          next: ['var', 'const', 'let'],
        },
      ],

      'prefer-arrow-callback': 2,
      'prefer-const': 2,
      quotes: [2, 'single', 'avoid-escape'],
      radix: [2, 'as-needed'],
      semi: [2, 'always'],
      'space-before-blocks': 2,

      'space-before-function-paren': [
        2,
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],

      'space-infix-ops': 2,
      strict: [2, 'global'],
      'vars-on-top': 1,
      'jsdoc/no-undefined-types': [1, { definedTypes: ['NodeJS'] }],
    },
  },
  {
    languageOptions: {
      globals: {
        // ...Object.fromEntries(
        //   Object.entries(globals.browser).map(([key]) => [key, 'off'])
        // ),
        ...globals.node,
      },
    },
    files: ['/*.{js,mjs}'],
    rules: {
      'no-console': [2, { allow: ['time', 'timeEnd'] }],
      'import-x/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'always',
        },
      ],
    },
  },
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.vitest,
        ...globals.browser,
      },
    },
    rules: {
      'no-console': 0,
      'jsdoc/no-undefined-types': 'off',
      'jsdoc/no-restricted-syntax': 'off',
      'jsdoc/reject-any-type': 'off',
      'prefer-smart-quotes/prefer': 'off',
      'no-magic-numbers': 'off',
      'no-underscore-dangle': [
        2,
        { allow: ['__dirname', '__filename', '_id', '__', 'mock__'] },
      ],
    },
  },
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
];
