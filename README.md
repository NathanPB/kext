## The f

I think that the ECMAScript stdlib is not enough for me, so I'm attempting to rewrite all of the usefull Kotlin's stdlib into Typescript.

Yes, it's that simple

**If you get any questions or suggestions just open a [discussion](https://github.com/NathanPB/kext/discussions) or an [issue](https://github.com/NathanPB/kext/issues)**

## Installation

This package is published in [npmjs](https://www.npmjs.com/package/@nathanpb/kext):

``npm i @nathanpb/kext`` or ``yarn add @nathanpb/kext``

If you want to try the unstable features, use the ``next`` tag: ``npm i @nathanpb/kext@next``.

## Example and Use Cases

### Generic array usage

```ts
import { any, sumBy } from '@nathanpb/kext/array'

const hasNonFriends = any(users, it => !it.areFriends(user))
const agesSum = sumBy(users, it => it.age)
```

### Try/catch as an expression

**Typescript:**

```ts
let token: JwtPayload | undefined = undefined // mutable variable bad, also can't have it's type inferred
try {
  token = jwt.verify(req.body, secret)
} catch (e) {
  throw error(403, 'Token not present')
}

// Here, the TS compiler still thinks that ``token`` can be undefined
```

**Typescript + @nathanpb/kext:**

```ts
import { runCatching, throwExpr } from "@nathanpb/kext/error";

const token = runCatching(() => jwt.verify(req.body, secret))
  .onFailure(() => throwExpr(error(403, 'Token not present')))
  .getOrUndefined()!!
```

<details>
  <summary>If you prefer, this can also be written as</summary>

  ```ts
  const token = runCatching(() => jwt.verify(req.body, secret))
    .recover(() => throwExpr(error(403, 'Token not present')))
    .getOrThrow()
  ```

  ```ts
  const token = runCatching(() => jwt.verify(req.body, secret))
    .recover(() => { throw error(403, 'Token not present') })
    .getOrThrow()
  ```
</details>

## Documentation

**For detailed information, see the [API Reference](https://kext.nathanpb.dev).**

This library is all inspired by Kotlin, so [their documentation](https://kotlinlang.org/docs/home.html) may be useful.

- [Arrays](https://kext.nathanpb.dev/modules/array.html) - Functions for array manipulation. Details on the Kotlin imp [here](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/-list/)
- [Scope](https://kext.nathanpb.dev/modules/scope.html) - Functions for scope manipulation. Details on the Kotlin imp [here](https://kotlinlang.org/docs/scope-functions.html)
- [Math](https://kext.nathanpb.dev/modules/math.html) - Functions for common math equations. Still incomplete.
- [Error](https://kext.nathanpb.dev/modules/error.html) - Functions for error/exception manipulation that I find handy.

## Showcase (Brief demonstration of the Arrays Module)
![showcase](https://user-images.githubusercontent.com/18128642/125735762-57d008b4-73c2-4d85-b6b8-87f3a37d5e08.gif)

## Performance

I'm putting a huge effort in making this library perform well, and the benchmarks tell that it can already perform better than the stdlib in the tested functions.

You can check the benchmarks [here](https://github.com/NathanPB/kext/actions/workflows/benchmark.yml). Navigate through the logs and attached report files...

Remamber, [this code very fast](https://github.com/torvalds/linux/pull/437)

## What's next

- Do a proper documentation
- Finish the unit tests and benchmarks for the Arrays module
- Write a typescript plugin to invoke array functions as an extension-like function
- Async-compatible functions

## Side Notes

- Project is in the very beginning
- Performance is questionable


## License

```
Copyright 2021 Nathan P. Bombana

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

Do whatever you want with my code just don't make it boring







Thanks, JetBrains
