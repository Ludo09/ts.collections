# Tiny Typescript Standard Library (ttsl)

TTSL stands for Tiny Typescript Standard Library. It's originally an attempt to learn Typescript.
It contains in particular a of typed collections (list, map, set, etc.).

# Installation

First thing first: retrieving local node modules listed in package.json. You can simply do it by:
```bash
npm install
```

Then you can compile/transpile all .ts files into ES5 by doing:
```bash
tsc --target es5 --modules commonjs
```