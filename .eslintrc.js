const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  extends: ['@sxzz/eslint-config-vue', '@sxzz/eslint-config-prettier'],
  rules: {
    'vue/prefer-import-from-vue': 'off',
    'vue/no-ref-as-operand': 'off',
  },
})
