const { resolve } = require('path')

const test = require('ava')

const { getBuildInfo } = require('../src/main')

const FIXTURES_RELATIVE_PATH = `${__dirname}/fixtures`
const FIXTURES_ABSOLUTE_PATH = resolve(FIXTURES_RELATIVE_PATH)

test('js-workspaces: project without package.json does not return workspaces info', async (t) => {
  const { jsWorkspaces } = await getBuildInfo({
    projectDir: `${FIXTURES_RELATIVE_PATH}/empty`,
  })
  t.is(jsWorkspaces, undefined)
})

test('js-workspaces: project without workspaces in package.json does not return workspaces info', async (t) => {
  const { jsWorkspaces } = await getBuildInfo({
    projectDir: `${FIXTURES_RELATIVE_PATH}/simple-package-json`,
  })
  t.is(jsWorkspaces, undefined)
})

test('js-workspaces: projectDir set to workspaces root returns workspace info and isRoot flag set to true', async (t) => {
  const { jsWorkspaces } = await getBuildInfo({
    projectDir: `${FIXTURES_RELATIVE_PATH}/js-workspaces`,
  })
  t.not(jsWorkspaces, undefined)
  t.true(jsWorkspaces.isRoot)
  t.is(jsWorkspaces.packages.length, 2)
})

test('js-workspaces: detects rootDir is the same as the projectDir and sets the isRoot flag to true', async (t) => {
  const { jsWorkspaces } = await getBuildInfo({
    rootDir: `${FIXTURES_ABSOLUTE_PATH}/js-workspaces`,
    projectDir: `${FIXTURES_RELATIVE_PATH}/js-workspaces`,
  })
  t.not(jsWorkspaces, undefined)
  t.true(jsWorkspaces.isRoot)
  t.is(jsWorkspaces.packages.length, 2)
})

test('js-workspaces: projectDir set to workspace dir returns workspace info and isRoot flag set to false', async (t) => {
  const { jsWorkspaces } = await getBuildInfo({
    rootDir: `${FIXTURES_RELATIVE_PATH}/js-workspaces`,
    projectDir: `${FIXTURES_RELATIVE_PATH}/js-workspaces/packages/package-1`,
  })
  t.not(jsWorkspaces, undefined)
  t.false(jsWorkspaces.isRoot)
  t.is(jsWorkspaces.packages.length, 2)
})

test('js-workspaces: if project is not part of a workspace return no workspace info', async (t) => {
  const { jsWorkspaces } = await getBuildInfo({
    rootDir: `${FIXTURES_RELATIVE_PATH}/js-workspaces`,
    projectDir: `${FIXTURES_RELATIVE_PATH}/js-workspaces/not-in-workspace`,
  })
  t.is(jsWorkspaces, undefined)
})

test('js-workspaces: handles absolute paths correctly', async (t) => {
  const { jsWorkspaces } = await getBuildInfo({
    rootDir: `${FIXTURES_ABSOLUTE_PATH}/js-workspaces`,
    projectDir: `${FIXTURES_ABSOLUTE_PATH}/js-workspaces/packages/package-1`,
  })
  t.not(jsWorkspaces, undefined)
  t.false(jsWorkspaces.isRoot)
  t.is(jsWorkspaces.packages.length, 2)
})
