## yek

Yek is key spelt backwards. It changes ["one", "two", "three"] to one[two][three] and back. It is a simple library and stresses on consistency. It's a bracket notation and is not customizable to be dot notation.

**Features:**
- Written in TypeScript with full type definitions
- Zero dependencies
- ES modules support
- Simple and intuitive API

[![Build Status](https://travis-ci.org/kahwee/yek.svg?branch=master)](https://travis-ci.org/kahwee/yek) [![Coverage Status](https://coveralls.io/repos/kahwee/yek/badge.svg?branch=master)](https://coveralls.io/r/kahwee/yek?branch=master) [![npm version](https://badge.fury.io/js/yek.svg)](http://badge.fury.io/js/yek)
[![bitHound Score](https://www.bithound.io/github/kahwee/yek/badges/score.svg)](https://www.bithound.io/github/kahwee/yek)

## Example use cases

```ts
// TypeScript/ESM
import { atos, stoa } from 'yek';

atos(['one', 'two', 'three']);
// returns one[two][three]

stoa('one[two][three]');
// returns ['one', 'two', 'three']
```

## Usage
Install from `npm`.

```sh
npm install --save yek
```

### Changing Array to String (atos)

```ts
// TypeScript
import { atos } from 'yek';
atos(['one', 'two', 'three']);
// returns one[two][three]
```

### Changing String to Array (stoa)

```ts
// TypeScript
import { stoa } from 'yek';
stoa('one[two][three]');
// returns ['one', 'two', 'three']
```

## License

MIT
