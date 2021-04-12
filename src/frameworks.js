'use strict'

const { listFrameworks } = require('@netlify/framework-info')

const getFrameworks = async function ({ projectDir }) {
  return await listFrameworks({ projectDir })
}

module.exports = { getFrameworks }
