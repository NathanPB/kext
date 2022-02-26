/*
 * Copyright 2021 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


import {ArrayMapper, ArrayPredicate, elementAt} from "../../array";
import {elementAtOrNull} from "./directAccess";
import {findIndexOfFirst, findIndexOfFirstBy, findIndexOfLast, findIndexOfLastBy} from "./findIndex";
import {NoSuchElementError} from "../../index";

export function findFirst<T>(array: T[], predicate: ArrayPredicate<T>): T {
  return elementAt(array, findIndexOfFirst(array, predicate))
}

export function findLast<T>(array: T[], predicate: ArrayPredicate<T>): T {
  return elementAt(array, findIndexOfLast(array, predicate))
}

export function findFirstBy<T, V extends T> (array: T[], find: V, select: ArrayMapper<T, V>): T {
  return elementAt(array, findIndexOfFirstBy(array, find, select))
}

export function findLastBy<T, V extends T> (array: T[], find: V, select: ArrayMapper<T, V>): T {
  return elementAt(array, findIndexOfLastBy(array, find, select))
}

export function findFirstOrNull<T>(array: T[], predicate: ArrayPredicate<T>): T | undefined {
  return elementAtOrNull(array, findIndexOfFirst(array, predicate))
}

export function findLastOrNull<T>(array: T[], predicate: ArrayPredicate<T>): T | undefined {
  return elementAtOrNull(array, findIndexOfLast(array, predicate))
}

/**
 * Searches for the first element through an array of objects, strictly comparing `find` with the result of `select`.
 *
 * Returns `undefined` if no element matches.
 *
 * This use strict comparison (not deep equal) and sequential search.
 *
 * @param array The array to work on
 * @param find The value to search through the array
 * @param select The selector which should be applied to compare with `find`
 */
export function findFirstOrNullBy<T, V> (array: T[], find: V, select: ArrayMapper<T, V>): T | undefined {
  return elementAtOrNull(array, findIndexOfFirstBy(array, find, select))
}

/**
 * Searches for the last element through an array of objects, strictly comparing `find` with the result of `select`.
 * Returns `undefined` if no element matches.
 *
 * This use strict comparison (not deep equal) and sequential search.
 *
 * @param array The array to work on
 * @param find The value to search through the array
 * @param select The selector which should be applied to compare with `find`
 */
export function findLastOrNullBy<T, V> (array: T[], find: V, select: ArrayMapper<T, V>): T | undefined {
  return elementAtOrNull(array, findIndexOfLastBy(array, find, select))
}

export function findFirstNotNullable<T>(array: T[]): T {
  if (array.length === 0)
    throw new NoSuchElementError()

  return elementAt(
    array,
    findIndexOfFirst(array, it => it != null)
  )
}

export function findLastNotNullable<T>(array: T[]): T {
  if (array.length === 0)
    throw new NoSuchElementError()

  return elementAt(
    array,
    findIndexOfLast(array, it => it != null)
  )
}
