module.exports = {
  parser: 'babel-eslint',
  extends: ['plugin:security/recommended'],
  plugins: [
    'security'
  ],
  env: {
    node: true
  },
  rules: {
    /**
       * Code Style
       */
      'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
      'class-methods-use-this': 'off',
      'function-paren-newline': 'off',
      'id-length': 'error',
      'implicit-arrow-linebreak': [0],
      'import/prefer-default-export': 'off',
      'max-len': [
        'error',
        {
          ignorePattern: '\\s*<|\\s*className|^import|^\\s*\\{.*\\},$',
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'no-debugger': 'warn',
      'no-irregular-whitespace': ['error', { skipTemplates: true }],
      'no-mixed-operators': 'off',
      'no-param-reassign': 'off',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-restricted-globals': 'error',
      'no-trailing-spaces': ['error', { skipBlankLines: true }],
      'no-underscore-dangle': 'off',
      'object-curly-newline': 'off',
      'prefer-destructuring': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['./server/']
      }
    }
  }
}
