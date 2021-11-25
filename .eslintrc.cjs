'use strict'

const { overrides } = require('@netlify/eslint-config-node')

module.exports = {
  extends: '@netlify/eslint-config-node',
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'import/extensions': [2, 'ignorePackages'],
  },
  overrides: [
    ...overrides,
    // TODO: remove once https://github.com/netlify/eslint-config-node/pull/362
    // is released and used by this repository
    {
      // **/*.md/*.js references code blocks inside markdown files
      files: ['**/*.md/*.js'],
      rules: {
        // Documentation might import dependencies not in package.json
        'node/no-missing-import': 0,
      },
    },
  ],
}
