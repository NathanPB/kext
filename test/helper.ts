/*
 * Copyright 2021 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {filterNotNullable} from "../src/lib/js/array";
import {SuiteDescription} from "@nathanpb/jest-bench/suite";

type MultiImpIn<T> = { js?: T, native?: T, ecma?: T }

export function multiImpTest<T extends Function, F>(imps: MultiImpIn<T>, ctx: F): [T, F][] {
  function mkProxiedCtx(prefix: String): F {
    return <F> Object.fromEntries(
      Object.entries(ctx)
        .map(([key, value]) => {
          if (typeof value === "function") {
            return [
              key,
              (first: any, ...rest: any) => {
                if (typeof first === 'string') first = `[${prefix}] ${first}`;
                value(first, ...rest)
              }
            ]
          }

          return [key, value]
        })
    )
  }

  return filterNotNullable(
    [
      imps.js && [imps.js, mkProxiedCtx('JS')],
      imps.native && [imps.native, mkProxiedCtx('NATIVE')],
      imps.ecma && [imps.ecma, mkProxiedCtx('ECMA')]
    ]
  )
}

export function multiImpBenchmark(imps: MultiImpIn<(() => Promise<void> | void)>, message: string): SuiteDescription {
  const obj: SuiteDescription = {}
  if (imps.js) obj[`[JS] ${message}`] = imps.js
  if (imps.native) obj[`[NATIVE] ${message}`] = imps.native
  if (imps.ecma) obj[`[ECMA] ${message}`] = imps.ecma
  return obj
}
