#!/usr/bin/env node
const { exit } = require('process')

const yargs = require('yargs')

const { getBuildInfo } = require('./main.js')

// CLI entry point
const runCli = async function () {
  const { projectDir, rootDir } = parseArgs()

  try {
    const buildInfo = await getBuildInfo({ projectDir, rootDir })
    console.log(JSON.stringify(buildInfo, null, 2))
  } catch (error) {
    console.error(error)
    exit(1)
  }
}

const parseArgs = function () {
  return yargs.command('* [projectDir]').options(OPTIONS).usage(USAGE).strict().parse()
}

const OPTIONS = {
  rootDir: {
    string: true,
    describe: `The root directory of the project if different from projectDir`,
  },
}

const USAGE = `$0 [OPTIONS...] [PROJECT_DIRECTORY]

Print relevant build information from a project.`

runCli()
