module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    "plugin:prettier/recommended",
  ],
  "plugins": [ 
    "prettier", 
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    "prettier/prettier": 2,
    "semi": ["error", "always"],
    "no-void": 0,
  }
}
