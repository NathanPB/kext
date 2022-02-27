# Concepts

## Curried Functions
Functions which starts with a lowercase ``y`` will usually be partially [Curried Functions](https://stackoverflow.com/q/36314/9893963).
The ``y`` character was chosen because it looks like an upside down λ.

```ts
import {yFindFirst, yElementAt} from '@nathanpb/kext/array'

const arr = [1, 2, 4, 8, 16]
const firstEven = yFindFirst(it => it % 2 === 0)(arr)
const secondElement = yElementAt(3)(arr)
```

### Why
Curried functions are particularly useful to work with high order functions, and in this lib were designed to interact well with the [chainer](/modules.md#chainer).

```ts
import {yFindFirst} from '@nathanpb/kext/array'
import {chainer} from '@nathanpb/kext/chainer'

const { value } = chainer([1, 2, 4, 8, 16])
  .next(yFindFirst(it => it % 2 === 0))
  .next(yMoreCoolProcessing)
  .next(console.log)
```

### Flip
Curried functions can cary extra ``f``s after the ``y`` (e.g. ``yfContainsAll``), meaning a **flip** modifier.
Functions with the **flip** modifier mean that the curried parameters are flipped from its natural form (without the ``f``).

It's also possible for a function to have multiple **flip** modifiers, each ``f`` mean that the nth + 1 parameter will be the curried one.

```ts
import {findFirstBy, yFindFirstBy, yfFindFirstBy, yffFindFirstBy} from '@nathanpb/kext/array'

findFirstBy    // (array, find, select)       => result
yFindFirstBy   // (find, select)  => (array)  => result
yfFindFirstBy  // (array, select) => (find)   => result
yffFindFirstBy // (array, find)   => (select) => result
```

## Scope Functions

Scope functions are the ones starting with ``_``. They are present in the [Scope module](/modules#scope) and are heavily inspired by [Kotlin's scope functions](https://kotlinlang.org/docs/scope-functions.html).

They are used for the purpose of taking an object and executing a block of code with this object on the scope, without making it available in the rest of the block.

From the Kotlin docs:
> The Kotlin standard library contains several functions whose sole purpose is to execute a block of code within the context of an object.

Scope functions take a generic value in the first parameter and pass it as ``this`` or the first argument in the callback.

```ts
import {_also, _with} from "./scope";

const userId = 1
const {posts} = _also(await db.findUser(userId), user => cache.update(user))

// work with posts
```
