'use strict'

const { getContext } = require('./context')
const { buildInfo } = require('./core')

const getBuildInfo = async function (opts) {
  const context = await getContext(opts)
  return await buildInfo(context)
}

module.exports = { getBuildInfo }
