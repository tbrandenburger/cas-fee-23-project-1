module.exports = {
  extends: [
    'semistandard'
  ],
  globals: {
    App: 'readonly',
    $: 'readonly'
  },
  rules: {
    'prefer-promise-reject-errors': ['off', 'always']
  }
};
