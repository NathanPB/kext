/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {ArrayMapper} from "../../src/array";
import {benchmarkSuite} from "@nathanpb/jest-bench";

const listSize = 10_000
const list: number[]  = [...Array(listSize).keys()].map((_, idx) => idx)

export function noCallback<T, V>(array: T[], find: V): number {
  for (let i=0; i<array.length; i++) {
    /* @ts-ignore */
    if (array[i] === find) {
      return i
    }
  }

  return -1
}

export function withOptCallback1<T, V>(array: T[], find: V, select?: ArrayMapper<T, V>): number {
  for (let i=0; i<array.length; i++) {
    const element = array[i]
    if (find === (select ? select(element, i, array) : element)) {
      return i
    }
  }

  return -1
}

export function withOptCallback2<T, V>(array: T[], find: V, select?: ArrayMapper<T, V>): number {
  for (let i=0; i<array.length; i++) {
    if (find === (select ? select(array[i], i, array) : array[i])) {
      return i
    }
  }

  return -1
}

export function withRequiredCallbackR<T, V>(array: T[], find: V, select: ArrayMapper<T, V>): number {
  for (let i=0; i<array.length; i++) {
    const element = array[i]
    if (find === select(element, i, array)) {
      return i
    }
  }

  return -1
}

/* @ts-ignore */
export function withDefaultedCallbackR<T, V>(array: T[], find: V, select: ArrayMapper<T, V> = it => it): number {
  for (let i=0; i<array.length; i++) {
    const element = array[i]
    if (find === select(element, i, array)) {
      return i
    }
  }

  return -1
}

benchmarkSuite('Array findIndex proof of concept', {
  'noCallback': () => void noCallback(list, 9999),
  'withOptCallback1 | present': () => void withOptCallback1(list, 9999, it => it),
  'withOptCallback1 | not present': () => void withOptCallback1(list, 9999),
  'withOptCallback2 | present': () => void withOptCallback2(list, 9999, it => it),
  'withOptCallback2 | not present': () => void withOptCallback2(list, 9999),
  'withRequiredCallback': () => void withRequiredCallbackR(list, 9999, it => it),
  'withDefaultedCallback | present': () => void withDefaultedCallbackR(list, 9999, it => it),
  'withDefaultedCallback | not present': () => void withDefaultedCallbackR(list, 9999),
})

/*
Preview:
    noCallback                           0.006 ms ± 0.71 %   (85 runs sampled)
    withOptCallback1 | present           0.005 ms ± 0.51 %   (89 runs sampled)
    withOptCallback1 | not present       0.005 ms ± 1.02 %   (87 runs sampled)
    withOptCallback2 | present           0.006 ms ± 17.55 %  (80 runs sampled)
    withOptCallback2 | not present       0.006 ms ± 2.00 %   (86 runs sampled)
    withRequiredCallback                 0.006 ms ± 0.83 %   (89 runs sampled)
    withDefaultedCallback | present      0.087 ms ± 15.40 %  (12 runs sampled)
    withDefaultedCallback | not present  0.103 ms ± 2.07 %   (85 runs sampled)

Why the fuck are optional arguments so slow?
*/
