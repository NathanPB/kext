/*
 * Copyright 2021 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// @ts-ignore
import {multiImpBenchmark} from "../helper";

import {benchmarkSuite} from '@nathanpb/jest-bench'
import * as ArrayJS from '../../src/lib/js/array'
import * as ArrayNative from '../../src/lib/native/array'

const listSize = 10_000
const list: number[]  = [...Array(listSize).keys()].map((_, idx) => idx)

benchmarkSuite("#indexOfFirst", {
  ...multiImpBenchmark({
    js: () => void ArrayJS.indexOfFirst(list, () => false),
    native: () => void ArrayNative.indexOfFirst(list, () => false),
    ecma: () => void list.findIndex(() => false)
  }, "worst"),

  ...multiImpBenchmark({
    js: () => void ArrayJS.indexOfFirst(list, () => true),
    native: () => void ArrayNative.indexOfFirst(list, () => true),
    ecma: () => void list.findIndex(() => true)
  }, "best"),

  ...multiImpBenchmark({
    js: () => void ArrayJS.indexOfFirst([], () => true),
    native: () => void ArrayNative.indexOfFirst([], () => true),
    ecma: () => void [].findIndex(() => true)
  }, "empty list")
})

benchmarkSuite("#all", {
  ...multiImpBenchmark({
    js: () => void ArrayJS.all(list, () => true),
    ecma: () => void list.every(() => true)
  }, "worst"),

  ...multiImpBenchmark({
    js: () => void ArrayJS.all(list, () => false),
    ecma: () => void list.every(() => false)
  }, "best"),

  ...multiImpBenchmark({
    js: () => void ArrayJS.all([], () => true),
    ecma: () => void [].every(() => true)
  }, "empty list")
})

benchmarkSuite("#indexOfLast", {
  ...multiImpBenchmark({
    js: () => void ArrayJS.indexOfLast(list, () => false),
    ecma: () => void (list.length - list.reverse().findIndex(() => false))
  }, "worst"),

  ...multiImpBenchmark({
    js: () => void ArrayJS.indexOfLast(list, () => true),
    ecma: () => void list.findIndex(() => true)
  }, "best"),

  ...multiImpBenchmark({
    js: () => void ArrayJS.indexOfLast([], () => true)
  }, "empty list")
})

// findLast, lastOrNull, lastNotNullableOf, indexOfLast

benchmarkSuite("#any", {
  ...multiImpBenchmark({
    js: () => void ArrayJS.any(list, () => false),
    ecma: () => void list.some(() => false)
  }, "worst"),

  ...multiImpBenchmark({
    js: () => void ArrayJS.any(list, () => true),
    ecma: () => void list.some(() => true)
  }, "best"),

  ...multiImpBenchmark({
    js: () => void ArrayJS.any([], () => true),
    ecma: () => void [].some(() => true)
  }, "empty list")
})

benchmarkSuite("#contains", {
  ...multiImpBenchmark({
    js: () => void ArrayJS.contains(list, -1),
    ecma: () => void list.includes(-1)
  }, "worst"),

  ...multiImpBenchmark({
    js: () => void ArrayJS.contains(list, 0),
    ecma: () => void list.includes(0)
  }, "best"),

  ...multiImpBenchmark({
    js: () => void ArrayJS.contains([], 0),
    ecma: () => void (<number[]> []).includes(0)
  }, "empty list")
})

/*
benchmarkSuite("#containsAll", {
  worstInLongList:   () => void A.containsAll(longList, [0, longListSize]),
  bestInLongList:    () => void A.containsAll(longList, [0]),
  averageInLongList: () => void A.containsAll(longList, [0, halfLongList]),

  worstInShortList:   () => void A.containsAll(shortList, [0, shortListSize]),
  bestInShortList:    () => void A.containsAll(shortList, [0]),
  averageInShortList: () => void A.containsAll(shortList, [halfLongList]),

  inEmptyList:  () => void A.containsAll(emptyList, [0]),
})

benchmarkSuite("#elementAtOrUndefined", {
  case1: () => void A.elementAtOrUndefined(longList, longListSize-1),
  case2: () => void A.elementAtOrUndefined(longList, 0)
})

benchmarkSuite("#elementAtOrElse", {
  case1: () => void A.elementAtOrElse(longList, longListSize-1, () => 1),
  case2: () => void A.elementAtOrElse(longList, 0, () => 1),

  caseElse: () => void A.elementAtOrElse(emptyList, 10, () => 1),
})

/*
benchmarkSuite("#findLast", {

})

benchmarkSuite("#firstOrNull", {

})

benchmarkSuite("#firstNotNullableOf", {

})

benchmarkSuite("#indexOfFirst", {

})

benchmarkSuite("#indexOfLast", {

})

benchmarkSuite("#lastOrNull", {

})

benchmarkSuite("#firstOrNullBy", {

})

benchmarkSuite("#firstOrNullByTransforming", {

})

benchmarkSuite("#lastOrNullBy", {

})

benchmarkSuite("#lastOrNullByTransforming", {

})
*/
