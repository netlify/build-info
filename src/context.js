const { resolve } = require('path')
const { cwd } = require('process')

const readPkg = require('read-pkg')

const getPackageJson = async function (dir) {
  try {
    const packageJson = await readPkg({ cwd: dir, normalize: false })
    if (packageJson === undefined) {
      return {}
    }

    return packageJson
  } catch (error) {
    return {}
  }
}

const getContext = async function ({ projectDir = cwd(), rootDir } = {}) {
  // Get the absolute dirs for both project and root
  const absoluteProjectDir = resolve(cwd(), projectDir)
  const absoluteRootDir = rootDir ? resolve(cwd(), rootDir) : undefined

  // We only pass through the root dir if it was provided and is actually different
  // from the project dir
  const validRootDir = absoluteRootDir && absoluteRootDir !== absoluteProjectDir ? absoluteRootDir : undefined

  // If rootDir equals projectDir we'll be getting the projectDir package.json
  // Later on if we also need the projectDir package.json we can check for it
  // and only perform one resolution
  const rootPackageJson = await getPackageJson(rootDir || projectDir)
  return {
    projectDir: absoluteProjectDir,
    rootDir: validRootDir,
    rootPackageJson,
  }
}

module.exports = { getContext }
