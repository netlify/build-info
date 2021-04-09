'use strict'

const { getWorkspaceInfo } = require('./workspaces')

const buildInfo = async function (context) {
  const workspaceInfo = await getWorkspaceInfo(context)
  const jsWorkspaces = workspaceInfo ? { jsWorkspaces: workspaceInfo } : {}
  return { ...jsWorkspaces }
}

module.exports = { buildInfo }
