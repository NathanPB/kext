/*
 * Copyright 2021 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


import {ArrayMapper, ArrayPredicate} from "./index";

export function all<T>(array: T[], predicate: ArrayPredicate<T>): boolean {
  return array.every(predicate)
}

export function any<T>(array: T[], predicate: ArrayPredicate<T>): boolean {
  return array.some(predicate)
}

export function contains<T>(array: T[], element: T): boolean {
  return array.includes(element)
}

export function containsAll<T>(array: T[], elements: T[]): boolean {
  return all(elements, it => array.includes(it))
}

export function elementAtOrUndefined<T>(array: T[], index: number): T | undefined {
  return array[index]
}

export function elementAtOrElse<T>(array: T[], index: number, defaultValue: (index: number)=>T): T {
  return index < 0 || index >= array.length ? defaultValue(index) : array[index]
}


export function findLast<T>(array: T[], predicate: ArrayPredicate<T>): T | undefined {
  for (let i = array.length-1; i>=0; i--) {
    const element = array[i]
    if (predicate(element, i, array)) {
      return element
    }
  }

  return undefined
}

export function firstOrNull<T>(array: T[], predicate: ArrayPredicate<T>): T | undefined {
  for (let i=0; i<array.length; i++) {
    const element = array[i]
    if (predicate(element, i, array)) {
      return element
    }
  }

  return undefined
}

export function firstNotNullableOf<T, R>(array: T[], transform: ArrayMapper<T, R | undefined | null>): R | undefined {
  for (let i=0; i<array.length; i++) {
    const element = transform(array[i], i, array)
    if (element != null) {
      return element
    }
  }

  return undefined
}

export function indexOfFirst<T>(array: T[], predicate: ArrayPredicate<T>): number {
  for (let i=0; i<array.length; i++) {
    if (predicate(array[i], i, array)) {
      return i
    }
  }

  return -1
}

export function indexOfLast<T>(array: T[], predicate: ArrayPredicate<T>): number {
  for (let i = array.length-1; i>=0; i--) {
    if (predicate(array[i], i, array)) {
      return i
    }
  }

  return -1
}

export function lastOrNull<T>(array: T[]): T | undefined {
  return array[array.length - 1]
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
export function firstOrNullBy<T, V> (array: T[], find: V, select: ArrayMapper<T, V>): T | undefined {
  return elementAtOrUndefined(
    array,
    indexOfFirst(array, (it, index) => find === select(it, index, array))
  )
}

/**
 * Searches for the first element through an array of objects, strictly comparing `find` with the result of `select`.
 * Then, apply `transform` to it. Returns `undefined` if no element matches.
 *
 * This use strict comparison (not deep equal) and sequential search.
 *
 * @param array The array to work on
 * @param find The value to search through the array
 * @param select The selector which should be applied to compare with `find`
 * @param transform The transformation to apply to the found value
 */
export function firstOrNullByTransforming<T, V, O> (
  array: T[],
  find: V,
  select: ArrayMapper<T, V>,
  transform: ArrayMapper<T, O>
): O | undefined {
  const idx = indexOfFirst(array, (it, index) => find === select(it, index, array))

  if (idx !== -1) {
    return transform(array[idx], idx, array)
  }

  return undefined
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
export function lastOrNullBy<T, V> (array: T[], find: V, select: ArrayMapper<T, V>): T | undefined {
  return elementAtOrUndefined(
    array,
    indexOfLast(array, (it, index) => find === select(it, index, array))
  )
}

/**
 * Searches for the last element through an array of objects, strictly comparing `find` with the result of `select`.
 * Then, apply `transform` to it. Returns `undefined` if no element matches.
 *
 * This use strict comparison (not deep equal) and sequential search.
 *
 * @param array The array to work on
 * @param find The value to search through the array
 * @param select The selector which should be applied to compare with `find`
 * @param transform The transformation to apply to the found value
 */
export function lastOrNullByTransforming<T, V, O> (
  array: T[],
  find: V,
  select: ArrayMapper<T, V>,
  transform: ArrayMapper<T, O>
): O | undefined {
  const idx = indexOfLast(array, (it, index) => find === select(it, index, array))

  if (idx !== -1) {
    return transform(array[idx], idx, array)
  }

  return undefined
}
