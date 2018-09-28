/* eslint-env node */

'use strict';

module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module', // es6 import/export
  },
  parser: 'babel-eslint', // class properties
  plugins: ['prettier'],
  env: {
    'browser': true,
    'node': true
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true
      },
    ],
    eqeqeq: ['error', 'always'], // adding some custom ESLint rules
    'brace-style': ['error', 'stroustrup'],
    'max-len': 0,
    'arrow-body-style': 0,
    'arrow-parens': 0,
    'import/prefer-default-export': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
};
