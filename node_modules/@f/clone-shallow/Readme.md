
# clone-shallow

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Create a shallow clone of an object or array

## Installation

    $ npm install @f/clone-shallow

## Usage

```js
var clone = require('@f/clone-shallow')

var arr = [1, 2, 3, 4]
var newArr = clone(arr)

deepEqual(arr, newArr)
arr !== newArr

var obj = {a: 1, b: 2, c: 3}
var newObj = clone(obj)

deepEqual(obj, newObj)
obj !== newObj
```

## API

### cloneShallow(a)

- `a` - The object or array to be cloned

**Returns:** A new object or array with identical contents to `a`.

## License

MIT

[travis-image]: https://img.shields.io/travis/micro-js/clone-shallow.svg?style=flat-square
[travis-url]: https://travis-ci.org/micro-js/clone-shallow
[git-image]: https://img.shields.io/github/tag/micro-js/clone-shallow.svg
[git-url]: https://github.com/micro-js/clone-shallow
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@f/clone-shallow.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@f/clone-shallow
