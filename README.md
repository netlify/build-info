
> ## !important Notice
>
> This repository was moved into the mono repository of [github.com/netlify/build](https://github.com/netlify/build)
> The package name and the versions are preserved!

[![Build](https://github.com/netlify/build-info/workflows/Build/badge.svg)](https://github.com/netlify/build-info/actions)
[![Node](https://img.shields.io/node/v/@netlify/build-info.svg?logo=node.js)](https://www.npmjs.com/package/@netlify/build-info)

# Build Info

Build information detection utility.

The purpose of this lib is to, given a project and a configuration, return a set of useful data for our build system.
Currently it's used to detect:

- [`jsWorkspaces`](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [`frameworks`](https://github.com/netlify/framework-info)

But it's possible to extend it in the future to extract other bits of information, such as the heuristics present in the
[`build-image`](https://github.com/netlify/build-image/blob/xenial/run-build-functions.sh#L214).

# Example (Node.js)

```js
import { getBuildInfo } from '@netlify/build-info'

console.log(await getBuildInfo({ projectDir: 'path/to/site', rootDir: '/project/root/dir' }))
// {
//   jsWorkspaces: {
//     isRoot: false,
//     packages: [
//       'path/to/site',
//       'path/to/component/library'
//       'path/to/utility/library'
//     ]
//   },
//   frameworks: [
//     {
//        name: 'gatsby',
//        category: 'static_site_generator',
//        dev: {
//          commands: ['gatsby develop'],
//          port: 8000
//        },
//        build: {
//          commands: ['gatsby build'],
//          directory: 'public'
//        },
//        env: { GATSBY_LOGGER: 'yurnalist' },
//        plugins: []
//      }
//    ]
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
//   },
//   frameworks: []
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
  },
  frameworks: []
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
  },
  frameworks: [
    {
       name: 'gatsby',
       category: 'static_site_generator',
       dev: {
         commands: ['gatsby develop'],
         port: 8000
       },
       build: {
         commands: ['gatsby build'],
         directory: 'public'
       },
       env: { GATSBY_LOGGER: 'yurnalist' },
       plugins: []
     }
  ]
}
```

## Contributors

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for instructions on how to set up and work on this repository. Thanks
for contributing!
