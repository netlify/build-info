const { cwd } = require('process')

const test = require('ava')

const { getContext } = require('../src/context')

const FIXTURES_RELATIVE_PATH = `${__dirname}/fixtures`

test('context: if no options are provided set projectDir to cwd', async (t) => {
  const { projectDir, rootDir } = await getContext()
  t.is(projectDir, cwd())
  t.is(rootDir, undefined)
})

test('context: given a relative projectDir and a rootDir, resolve projectDir from rootDir', async (t) => {
  const argRootDir = '/root'
  const argProjectDir = 'some/relative/path'
  const { projectDir, rootDir, rootPackageJson } = await getContext({ projectDir: argProjectDir, rootDir: argRootDir })
  t.is(projectDir, `${argRootDir}/${argProjectDir}`)
  t.is(rootDir, rootDir)
  t.deepEqual(rootPackageJson, {})
})

test('context: given an empty projectDir and a rootDir, resolve projectDir to rootDir', async (t) => {
  const argRootDir = '/root/dir'
  const argProjectDir = ''
  const { projectDir, rootDir, rootPackageJson } = await getContext({ projectDir: argProjectDir, rootDir: argRootDir })
  t.is(projectDir, argRootDir)
  t.is(rootDir, undefined)
  t.deepEqual(rootPackageJson, {})
})

test('context: given a relative rootDir resolve from cwd', async (t) => {
  const argRootDir = 'root'
  const argProjectDir = 'some/relative/path'
  const { projectDir, rootDir, rootPackageJson } = await getContext({ projectDir: argProjectDir, rootDir: argRootDir })
  t.is(projectDir, `${cwd()}/${argRootDir}/${argProjectDir}`)
  t.is(rootDir, `${cwd()}/${argRootDir}`)
  t.deepEqual(rootPackageJson, {})
})

test('context: given absolute dirs rely on them', async (t) => {
  const argRootDir = '/root/dir'
  const argProjectDir = '/root/dir/sub/project/dir'
  const { projectDir, rootDir, rootPackageJson } = await getContext({ projectDir: argProjectDir, rootDir: argRootDir })
  t.is(projectDir, argProjectDir)
  t.is(rootDir, argRootDir)
  t.deepEqual(rootPackageJson, {})
})

test('context: extract the rootPackageJson if there is one within rootDir', async (t) => {
  const { rootPackageJson } = await getContext({
    rootDir: `${FIXTURES_RELATIVE_PATH}/js-workspaces`,
    projectDir: 'packages/package-1',
  })
  t.is(rootPackageJson.name, 'js-workspaces')
})

test('context: extract the rootPackageJson from projectDir if no rootDir is provided', async (t) => {
  const { rootPackageJson, rootDir } = await getContext({
    projectDir: `${FIXTURES_RELATIVE_PATH}/js-workspaces/packages/package-1`,
  })
  t.is(rootDir, undefined)
  t.is(rootPackageJson.name, 'package-1')
})
