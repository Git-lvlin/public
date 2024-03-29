module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    // 'standard',
  ],
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never', ts: 'never', tsx: 'never', vue: 'never',
    }],
    'no-param-reassign': 0,
    'consistent-return': 0,
    'linebreak-style': 0,
    'space-before-function-paren': 0 
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'node_modules/@vue/cli-service/webpack.config.js',
      },
    },
  },
};
