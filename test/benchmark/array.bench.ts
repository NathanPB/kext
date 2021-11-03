/*
 * Copyright 2021 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {benchmarkSuite} from '@nathanpb/jest-bench'
import * as A from '../../src/array'

const listSize = 10_000
const list: number[]  = [...Array(listSize).keys()].map((_, idx) => idx)

benchmarkSuite("#indexOfFirst", {
  ["[JS] worst"]: () => void A.indexOfFirst(list, () => false),
  ["[ECMA] worst"]: () => void list.findIndex(() => false),

  ["[JS] best"]: () => void A.indexOfFirst(list, () => true),
  ["[ECMA] best"]: () => void list.findIndex(() => true),

  ["[JS] empty list"]: () => void A.indexOfFirst([], () => true),
  ["[ECMA] empty list"]: () => void [].findIndex(() => true),
})

benchmarkSuite("#all", {
  ["[JS] worst"]: () => void A.all(list, () => true),
  ["[ECMA] worst"]: () => void list.every(() => true),

  ["[JS] best"]: () => void A.all(list, () => false),
  ["[ECMA] best"]: () => void list.every(() => false),

  ["[JS] empty list"]: () => void A.all([], () => true),
  ["[ECMA] empty list"]: () => void [].every(() => true),
})

benchmarkSuite("#indexOfLast", {
  ["[JS] worst"]: () => void A.indexOfLast(list, () => false),
  ["[ECMA] worst"]: () => void (list.length - list.reverse().findIndex(() => false)),

  ["[JS] best"]: () => void A.indexOfLast(list, () => true),
  ["[ECMA] best"]: () => void list.findIndex(() => true),

  ["[JS] empty list"]: () => void A.indexOfLast([], () => true),
})

benchmarkSuite("#any", {
  ["[JS] worst"]: () => void A.any(list, () => false),
  ["[ECMA] worst"]: () => void list.some(() => false),

  ["[JS] best"]: () => void A.any(list, () => true),
  ["[ECMA] best"]: () => void list.some(() => true),

  ["[JS] empty list"]: () => void A.any([], () => true),
  ["[ECMA] empty list"]: () => void [].some(() => true),
})

benchmarkSuite("#contains", {
  ["[JS] worst"]: () => void A.contains(list, -1),
  ["[ECMA] worst"]: () => void list.includes(-1),

  ["[JS] best"]: () => void A.contains(list, 0),
  ["[ECMA] best"]: () => void list.includes(0),

  ["[JS] empty list"]: () => void A.contains([], 0),
  ["[ECMA] empty list"]: () => void (<number[]> []).includes(0),
})

benchmarkSuite("#sum", {
  ["[JS] worst"]: () => void A.sum(list),
  ["[ECMA] worst"]: () => void list.reduce((a, b) => a + b, 0),

  ["[JS] best / empty list"]: () => void A.sum([]),
  ["[ECMA] best / empty list"]: () => void [].reduce((a, b) => a + b, 0),
})

/*
findLast, lastOrNull, lastNotNullableOf, indexOfLast
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
