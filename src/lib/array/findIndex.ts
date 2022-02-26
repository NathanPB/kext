/*
 * Copyright 2021 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {ArrayMapper, ArrayPredicate} from "../../array";

export function indexOfFirst<T, V>(array: T[], find: V, select?: ArrayMapper<T, V>): number {
  for (let i=0; i<array.length; i++) {
    const element = array[i]
    if (find === (select ? select(element, i, array) : element)) {
      return i
    }
  }

  return -1
}

export function indexOfLast<T, V>(array: T[], find: V, select?: ArrayMapper<T, V>): number {
  for (let i = array.length-1; i>=0; i--) {
    const element = array[i]
    if (find === (select ? select(element, i, array) : element)) {
      return i
    }
  }

  return -1
}

export function findIndexOfFirst<T>(array: T[], predicate: ArrayPredicate<T>): number {
  for (let i=0; i<array.length; i++) {
    if (predicate(array[i], i, array)) {
      return i
    }
  }

  return -1
}

export function findIndexOfLast<T>(array: T[], predicate: ArrayPredicate<T>): number {
  for (let i = array.length-1; i>=0; i--) {
    if (predicate(array[i], i, array)) {
      return i
    }
  }

  return -1
}
