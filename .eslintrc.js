module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    mocha: true
  },
  'extends': [
    'plugin:vue/strongly-recommended',
    // 'eslint:recommended'
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //disabled function args unused error
    "no-unused-vars": ["error", {"args": "none"}]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
