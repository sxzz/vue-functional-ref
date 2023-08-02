const { sxzz } = require('@sxzz/eslint-config')
module.exports = sxzz({
  rules: {
    'vue/no-ref-as-operand': 'off',
    'vue/prefer-import-from-vue': 'off',
  },
})
