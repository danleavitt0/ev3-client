
# is-number

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Check if a value is a number

## Installation

    $ npm install @f/is-number

## Usage

```js
var isNumber = require('@f/is-number')

isNumber(1)
isNumber(NaN)
!isNumber('test')
!isNumber('10')

```

## API

### isNumber(value)

- `value` - The value to be checked for numberness

**Returns:** Boolean value indicating whether or not `value` is a number.

## License

MIT

[travis-image]: https://img.shields.io/travis/micro-js/is-number.svg?style=flat-square
[travis-url]: https://travis-ci.org/micro-js/is-number
[git-image]: https://img.shields.io/github/tag/micro-js/is-number.svg
[git-url]: https://github.com/micro-js/is-number
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@f/is-number.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@f/is-number
