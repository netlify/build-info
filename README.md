[![Build](https://github.com/netlify/build-info/workflows/Build/badge.svg)](https://github.com/netlify/build-info/actions)
[![Node](https://img.shields.io/node/v/@netlify/build-info.svg?logo=node.js)](https://www.npmjs.com/package/@netlify/build-info)

# Build Info

Build information detection utility.

The purpose of this lib is to, given a project and a configuration, return a set of useful data for our build system.
Currently it's only used to detect [`workspaces`](https://docs.npmjs.com/cli/v7/using-npm/workspaces), however one can
easily extend it to detected other things such as package managers used, or other pieces of info not given by
[@netlify/framework-info](https://github.com/netlify/framework-info) and most likely only kept within [`build-image`](https://github.com/netlify/build-image/blob/xenial/run-build-functions.sh#L214).

# Example (Node.js)
```js
const { getBuildInfo } = require('@netlify/build-info')

console.log(await getBuildInfo({ projectDir: 'path/to/site', rootDir: '/project/root/dir' }))
// {
//   jsWorkspaces: {
//     isRoot: false,
//     packages: [
//       'path/to/site',
//       'path/to/component/library'
//       'path/to/utility/library'
//     ]
//   }
// }

console.log(await getBuildInfo({ projectDir: '/project/root/dir' }))
// {
//   jsWorkspaces: {
//     isRoot: true,
//     packages: [
//       'path/to/site',
//       'path/to/component/library'
//       'path/to/utility/library'
//     ]
//   }
// }
```

# Example (CLI)

```bash
$ build-info /project/root/dir
{
  jsWorkspaces: {
    isRoot: true,
    packages: [
      'path/to/site',
      'path/to/component/library'
      'path/to/utility/library'
    ]
  }
}

$ build-info path/to/site --rootDir /project/root/dir
{
  jsWorkspaces: {
    isRoot: false,
    packages: [
      'path/to/site',
      'path/to/component/library'
      'path/to/utility/library'
    ]
  }
}
```


## Contributors

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for instructions on how to set up and work on this repository. Thanks
for contributing!
