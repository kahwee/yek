## yek

Yek is key spelt backwards. It changes ["one", "two", "three"] to one[two][three] and back using 'yek'. It is a simple library and does stresses on consistency to and fro. I know there are other libaries but they tend to have too much magic. It's a bracket notation. There will never be dot notation.

[![Build Status](https://travis-ci.org/kahwee/yek.svg?branch=master)](https://travis-ci.org/kahwee/yek) [![Coverage Status](https://coveralls.io/repos/kahwee/yek/badge.svg?branch=master)](https://coveralls.io/r/kahwee/yek?branch=master) [![npm version](https://badge.fury.io/js/yek.svg)](http://badge.fury.io/js/yek)

## Example use cases

```js
var key = require('yek/key');
key(["one", "two", "three"]);
// returns one[two][three]

var yek = require('yek/yek');
yek("one[two][three]");
// returns ["one", "two", "three"]
```

## Usage
Install from `npm`.

```sh
npm install --save yek
```

Requiring in JavaScript

```js
var key = require('yek/key');
key(["one", "two", "three"]);
// returns one[two][three]
```

```js
var yek = require('yek/yek');
yek("one[two][three]");
// returns ["one", "two", "three"]
```

## License

MIT
