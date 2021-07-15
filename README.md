## The f

I think that the ECMAScript stdlib is not enough for me, so I'm attempting to rewrite all of the usefull Kotlin's stdlib into Typescript.

Yes, it's that simple

## Example

```ts
import { any, sumBy } from '@nathanpb/kext/array'

const hasNonFriends = any(users, it => !it.areFriends(user))
const agesSum = sumBy(users, it => it.age)
```

## Done

![x] - Arrays/Lists/Collections (``any``, ``none``, ``distinct``, etc)
![] - Extensions (``let``, ``also``, ``takeOrNull``, etc...)

## What's next

- Do a proper documentation
- Write unit tests
- Write a typescript plugin to invoke array functions as an extension-like function

## Further documentation

It's not done for now, you may find something usefull at the Kotlin official documentation

- [Iterable](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/-iterable/)
- [List](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/-list/)

## License

```
Copyright 2021 Nathan P. Bombana

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

Do whatever you want with my code just don't make it boring







Thanks, JetBrains
