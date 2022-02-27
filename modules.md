# Modules

## Array
[View all functions](/api/modules/Array.html)

Functions in this module can feature a [curry modifier](/concepts.md#curried-functions).

Import from ``@nathanpb/kext/array``

## Chainer
[View all functions](/api/modules/Chainer.html)

Import from ``@nathanpb/kext/chainer``

Simple chainer of calls, similar to ``Promise``. Particularly useful for curried functions.

```ts
import {chainer} from '@nathanpb/kext/chainer'

const value = await chainer([1, 2, 3, 4])
  .next(yMap(it => it * 5))
  .next(yFilter(it => it > 10))
  .next(yFindLastOrNull(it => it % 2 === 0))
```

You can turn any chainer into a promise for async work:

```ts
import {chainer} from '@nathanpb/kext/chainer'

const value = await chainer([1, 2, 3, 4])
  .next(yMap(it => it * 5))
  .next(yFilter(it => it > 10))
  .then(value => db.findPurchaseByValue(value))
  .then(purchase => db.findUser(purchase.userId))
```

## Enum
[View all functions](/api/modules/Enum.html)

Import from ``@nathanpb/kext/enum``

Functions to easily work with Enums, even in Javascript.

## Error
[View all functions](/api/modules/Error.html)

Import from ``@nathanpb/kext/error``

Functions for error handling and recovery.

## Math
[View all functions](/api/modules/Math.html)

Import from ``@nathanpb/kext/math``

## Object
[View all functions](/api/modules/Object.html)

Functions in this module can feature a [curry modifier](/concepts.md#curried-functions).

Import from ``@nathanpb/kext/object``

## Random
[View all functions](/api/modules/Random.html)

Import from ``@nathanpb/kext/random``

## Scope
[View all functions](/api/modules/Scope.html)

Functions in this module can feature a [scope modifier](/concepts.md#scoped-functions).

Import from ``@nathanpb/kext/scope``
