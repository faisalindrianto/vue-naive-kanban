/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
  ],
  rules: {
    'quotes': [2, 'single', { 'avoidEscape': true }],
    'no-console': 'off',
    'semi': ['error', 'never'],
    'vue/multi-word-component-names': 'off'
  },
}
