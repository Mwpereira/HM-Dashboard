/* eslint-disable */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  plugins: [

  ],
  rules: {
    'camelcase': 'off',
    indent: [
      'error',
      'tab'
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'always'
    ],
    'sort-keys': ['error', 'asc', {'caseSensitive': true, 'minKeys': 2, 'natural': false}],
    'vue/no-parsing-error': 'off'
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaFeatures : {
      jsx : false
    }
  },
}
