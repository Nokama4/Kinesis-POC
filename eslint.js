module.exports = {
  parser: "@babel/eslint-parser",
  plugins: [
    'security'
  ],
  extends: [
    'plugin:security/recommended'
  ],
  env: {
    node: true
  },
  rules: {
    'security/detect-object-injection': 'off'
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['./']
      }
    }
  }
}
