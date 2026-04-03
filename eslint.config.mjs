import js from '@eslint/js';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import prettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';

export default [
  js.configs.recommended,

  ...reactPlugin.configs.flat.recommended,
  ...reactPlugin.configs.flat['jsx-runtime'],

  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  { 
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'react/no-unescaped-entities': 'off',
      'react/prop-types': 'off',
    },
  },

  prettier,
];