'use strict'

const { getFrameworks } = require('./frameworks')
const { getWorkspaceInfo } = require('./workspaces')

const buildInfo = async function (context) {
  const workspaceInfo = await getWorkspaceInfo(context)
  const jsWorkspaces = workspaceInfo ? { jsWorkspaces: workspaceInfo } : {}
  const frameworks = await getFrameworks(context)
  return { ...jsWorkspaces, frameworks }
}

module.exports = { buildInfo }
