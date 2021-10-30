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
import * as ArrayJS from '../../src/lib/js/array'
import * as ArrayNative from '../../src/lib/native/array'

const longListSize = 10_000
//const shortListSize = 1000

const halfLongList = longListSize / 2
//const halfShortList = shortListSize / 2

//const emptyList: number[] = []
//const shortList: number[] = [...Array(shortListSize).keys()].map((_, idx) => idx)
const longList: number[]  = [...Array(longListSize).keys()].map((_, idx) => idx)

benchmarkSuite("#indexOfFirst", {
  impCustomJSWorst: () => {
    ArrayJS.indexOfFirst(longList, (it) => it === longListSize)
  },
  impCustomJSBest: () => {
    ArrayJS.indexOfFirst(longList, (it) => it === 0)
  },
  impCustomJSAvg: () => {
    ArrayJS.indexOfFirst(longList, (it) => it === halfLongList)
  },

  impCustomNativeWorst: () => {
    ArrayNative.indexOfFirst(longList, (it) => it === longListSize)
  },
  impCustomNativeBest: () => {
    ArrayNative.indexOfFirst(longList, (it) => it === 0)
  },
  impCustomNativeAvg: () => {
    ArrayNative.indexOfFirst(longList, (it) => it === halfLongList)
  },

  impEcmaStdlibWorst: () => {
    longList.findIndex(it => it === longListSize)
  },
  impEcmaStdlibBest: () => {
    longList.findIndex(it => it === 0)
  },
  impEcmaStdlibAvg: () => {
    longList.findIndex(it => it === halfLongList)
  },
})

/*
benchmarkSuite("#indexOfLast", {
  impCustomJSWorst: () => {
    ArrayJS.indexOfLast(longList, (it) => it === longListSize)
  },
  impCustomJSBest: () => {
    ArrayJS.indexOfLast(longList, (it) => it === 0)
  },
  impCustomJSAvg: () => {
    ArrayJS.indexOfLast(longList, (it) => it === halfLongList)
  },

  impCustomNativeWorst: () => {
    ArrayNative.indexOfLast(longList, (it) => it === longListSize)
  },
  impCustomNativeBest: () => {
    ArrayNative.indexOfLast(longList, (it) => it === 0)
  },
  impCustomNativeAvg: () => {
    ArrayNative.indexOfLast(longList, (it) => it === halfLongList)
  },
})

// findLast, lastOrNull, lastNotNullableOf, indexOfLast
/*
benchmarkSuite("#all", {
  worstInLongList:   () => void A.all(longList, () => true),
  bestInLongList:    () => void A.all(longList, () => false),
  averageInLongList: () => void A.all(longList, i => i <= halfLongList),

  worstInShortList:   () => void A.all(shortList, () => true),
  bestInShortList:    () => void A.all(shortList, () => false),
  averageInShortList: () => void A.all(shortList, i => i <= halfShortList),

  inEmptyList:  () => void A.all(emptyList, () => true)
})

benchmarkSuite("#any", {
  bestInLongList:    () => void A.any(longList, () => true),
  worstInLongList:   () => void A.any(longList, () => false),
  averageInLongList: () => void A.any(longList, i => i >= halfLongList),

  bestInShortList:    () => void A.any(shortList, () => true),
  worstInShortList:   () => void A.any(shortList, () => false),
  averageInShortList: () => void A.any(shortList, i => i >= halfShortList),

  inEmptyList:  () => void A.any(emptyList, () => true)
})

benchmarkSuite("#contains", {
  worstInLongList:   () => void A.contains(longList, longListSize),
  bestInLongList:    () => void A.contains(longList, 0),
  averageInLongList: () => void A.contains(longList, halfLongList),

  worstInShortList:   () => void A.contains(shortList, shortListSize),
  bestInShortList:    () => void A.contains(shortList, 0),
  averageInShortList: () => void A.contains(shortList, halfLongList),

  inEmptyList:  () => void A.contains(emptyList, 0),
})

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
