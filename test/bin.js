const test = require('ava')
const execa = require('execa')
const { getBinPath } = require('get-bin-path')

const FIXTURES_DIR = `${__dirname}/fixtures`

const BINARY_PATH = getBinPath()

test('CLI --help flag', async (t) => {
  const binPath = await BINARY_PATH
  const { stdout } = await execa(binPath, ['--help'])
  t.snapshot(stdout)
})

test('CLI prints js-workspaces and frameworks in JSON format', async (t) => {
  const binPath = await BINARY_PATH
  const { stdout } = await execa(binPath, [
    `${FIXTURES_DIR}/js-workspaces/packages/gatsby-site`,
    '--rootDir',
    `${FIXTURES_DIR}/js-workspaces`,
  ])
  const { jsWorkspaces } = JSON.parse(stdout)
  t.false(jsWorkspaces.isRoot)
  t.is(jsWorkspaces.packages.length, 2)
})

test('CLI does not print js-workspaces if given a project without it', async (t) => {
  const binPath = await BINARY_PATH
  const { stdout } = await execa(binPath, [`${FIXTURES_DIR}/js-workspaces/packages/gatsby-site`])
  const { jsWorkspaces } = JSON.parse(stdout)
  t.is(jsWorkspaces, undefined)
})

test('CLI prints an empty array if no frameworks are found', async (t) => {
  const binPath = await BINARY_PATH
  const { stdout } = await execa(binPath, [`${FIXTURES_DIR}/empty`])
  const { frameworks } = JSON.parse(stdout)
  t.deepEqual(frameworks, [])
})
