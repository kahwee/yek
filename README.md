## yek

Yek is key spelt backwards. It changes arrays like `["one", "two", "three"]` to bracket notation strings like `one[two][three]` and back again. It provides a simple, consistent way to convert between these formats.

**Features:**
- Written in TypeScript with full type definitions
- Zero runtime dependencies
- ES modules support
- 100% test coverage
- Tree-shakable
- Simple and intuitive API

[![CI](https://github.com/kahwee/yek/actions/workflows/ci.yml/badge.svg)](https://github.com/kahwee/yek/actions/workflows/ci.yml) [![Coverage Status](https://coveralls.io/repos/github/kahwee/yek/badge.svg?branch=main)](https://coveralls.io/github/kahwee/yek?branch=main) [![npm version](https://badge.fury.io/js/yek.svg)](https://badge.fury.io/js/yek)

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
