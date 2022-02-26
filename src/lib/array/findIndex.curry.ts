/*
 * Copyright 2021 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {ArrayMapper, ArrayPredicate, findIndexOfFirst, findIndexOfLast, indexOfFirst, indexOfLast} from "../../array";

/**
 * Curried version of {@link indexOfFirst}.
 * @inheritDoc indexOfFirst
 */
export function yIndexOfFirst<T, V>(find: V, select?: ArrayMapper<T, V>) {
  return (array: T[]) => indexOfFirst(array, find, select)
}

/**
 * Curried version of {@link indexOfFirst}.
 * @inheritDoc indexOfFirst
 */
export function yfIndexOfFirst<T, V>(array: T[], select?: ArrayMapper<T, V>) {
  return (find: V) => indexOfFirst(array, find, select)
}

/**
 * Curried version of {@link indexOfLast}.
 * @inheritDoc indexOfLast
 */
export function yIndexOfLast<T, V>(find: V, select?: ArrayMapper<T, V>) {
  return (array: T[]) => indexOfLast(array, find, select)
}

/**
 * Curried version of {@link indexOfLast}.
 * @inheritDoc indexOfLast
 */
export function yfIndexOfLast<T, V>(array: T[], select?: ArrayMapper<T, V>) {
  return (find: V) => indexOfLast(array, find, select)
}

/**
 * Curried version of {@link findIndexOfFirst}.
 * @inheritDoc findIndexOfFirst
 */
export function yFindIndexOfFirst<T>(predicate: ArrayPredicate<T>) {
  return (array: T[]) => findIndexOfFirst(array, predicate)
}

/**
 * Curried version of {@link findIndexOfFirst}.
 * @inheritDoc findIndexOfFirst
 */
export function yfFindIndexOfFirst<T>(array: T[]) {
  return (predicate: ArrayPredicate<T>) => findIndexOfFirst(array, predicate)
}

/**
 * Curried version of {@link findIndexOfLast}.
 * @inheritDoc findIndexOfLast
 */
export function yFindIndexOfLast<T>(predicate: ArrayPredicate<T>) {
  return (array: T[]) => findIndexOfLast(array, predicate)
}

/**
 * Curried version of {@link findIndexOfLast}.
 * @inheritDoc findIndexOfLast
 */
export function yfFindIndexOfLast<T>(array: T[]) {
  return (predicate: ArrayPredicate<T>) => findIndexOfLast(array, predicate)
}
