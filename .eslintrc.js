module.exports = {
  root: true,
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false
    }],
    'space-before-function-paren': 'off',
    'indent': 'off',
    'key-spacing': 'off',
    'quotes': 'off',
    'object-curly-spacing': 'off',
    'spaced-comment': 'off',
    'semi': 'off',
    'comma-dangle': 'off',
    'space-infix-ops': 'off',
    'no-undef': 'off',
    'padded-blocks': 'off',
    'eqeqeq': 'off',
    'space-before-blocks': 'off',
    'camelcase': 'off',
    'no-multiple-empty-lines': 'off',
    'no-unused-vars': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
