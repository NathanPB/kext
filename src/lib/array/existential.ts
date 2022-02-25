/*
 * Copyright 2021 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {ArrayPredicate} from "../../array";
import {findIndexOfFirst, indexOfFirst} from "./findIndex";

export * from './existential.curry'

export function all<T>(array: T[], predicate: ArrayPredicate<T>): boolean {
  for (let i=0; i<array.length; i++) {
    if (!predicate(array[i], i, array)) {
      return false
    }
  }
  return true
}

export function any<T>(array: T[], predicate: ArrayPredicate<T>): boolean {
  return findIndexOfFirst(array, predicate) !== -1
}

export function none<T>(array: T[], predicate: ArrayPredicate<T>): boolean {
  return !any(array, predicate)
}

export function contains<T>(array: T[], element: T): boolean {
  return indexOfFirst(array, element) !== -1
}

export function containsAll<T>(array: T[], elements: T[]): boolean {
  return all(elements, it => contains(array, it))
}

