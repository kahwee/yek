## yek

[![Greenkeeper badge](https://badges.greenkeeper.io/kahwee/yek.svg)](https://greenkeeper.io/)

Yek is key spelt backwards. It changes ["one", "two", "three"] to one[two][three] and back. It is a simple library and does stresses on consistency to and fro. It's a bracket notation and is not customizable to be dot notation.

[![Build Status](https://travis-ci.org/kahwee/yek.svg?branch=master)](https://travis-ci.org/kahwee/yek) [![Coverage Status](https://coveralls.io/repos/kahwee/yek/badge.svg?branch=master)](https://coveralls.io/r/kahwee/yek?branch=master) [![npm version](https://badge.fury.io/js/yek.svg)](http://badge.fury.io/js/yek)
[![bitHound Score](https://www.bithound.io/github/kahwee/yek/badges/score.svg)](https://www.bithound.io/github/kahwee/yek)

## Example use cases

```js
var atos = require('yek/atos');
atos(['one', 'two', 'three']);
// returns one[two][three]

var stoa = require('yek/stoa');
stoa('one[two][three]');
// returns ['one', 'two', 'three']
```

## Usage
Install from `npm`.

```sh
npm install --save yek
```

### Changing Array to String (atos)

```js
var atos = require('yek/atos');
atos(['one', 'two', 'three']);
// returns one[two][three]
```

### Changing String to Array (stoa)

```js
var stoa = require('yek/stoa');
stoa('one[two][three]');
// returns ['one', 'two', 'three']
```

## License

MIT
