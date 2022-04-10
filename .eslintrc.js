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
    'vue/no-parsing-error': 'off'
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaFeatures : {
      jsx : false
    }
  },
}
