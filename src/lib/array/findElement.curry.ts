/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {
  ArrayMapper,
  findFirst,
  findFirstBy,
  findFirstOrNull,
  findFirstOrNullBy,
  findLast,
  findLastBy,
  findLastOrNull,
  findLastOrNullBy
} from "../../array";
import {curry2, flipSecond2} from "../../curry";

export const yFindFirst = curry2(findFirst)

export const yfFindFirst = curry2(flipSecond2(findFirst))

export const yFindLast = curry2(findLast)

export const yfFindLast = curry2(flipSecond2(findLast))

export function yFindFirstBy<T, V extends T>(find: V, select: ArrayMapper<T, V>) {
  return (array: T[]) => findFirstBy(array, find, select)
}

export function yfFindFirstBy<T, V extends T>(array: T[], select: ArrayMapper<T, V>) {
  return (find: V) => findFirstBy(array, find, select)
}

export function yffFindFirstBy<T, V extends T>(array: T[], find: V) {
  return (select: ArrayMapper<T, V>) => findFirstBy(array, find, select)
}

export function yFindLastBy<T, V extends T>(find: V, select: ArrayMapper<T, V>) {
  return (array: T[]) => findLastBy(array, find, select)
}

export function yfFindLastBy<T, V extends T>(array: T[], select: ArrayMapper<T, V>) {
  return (find: V) => findLastBy(array, find, select)
}

export function yffFindLastBy<T, V extends T>(array: T[], find: V) {
  return (select: ArrayMapper<T, V>) => findLastBy(array, find, select)
}

export const yFindFirstOrNull = curry2(findFirstOrNull)

export const yfFindFirstOrNull = curry2(flipSecond2(findFirstOrNull))

export const yFindLastOrNull = curry2(findLastOrNull)

export const yfFindLastOrNull = curry2(flipSecond2(findLastOrNull))

export function yFindFirstOrNullBy<T, V extends T>(find: V, select: ArrayMapper<T, V>) {
  return (array: T[]) => findFirstOrNullBy(array, find, select)
}

export function yfFindFirstOrNullBy<T, V extends T>(array: T[], select: ArrayMapper<T, V>) {
  return (find: V) => findFirstOrNullBy(array, find, select)
}

export function yffFindFirstOrNullBy<T, V extends T>(array: T[], find: V) {
  return (select: ArrayMapper<T, V>) => findFirstOrNullBy(array, find, select)
}

export function yFindLastOrNullBy<T, V extends T>(find: V, select: ArrayMapper<T, V>) {
  return (array: T[]) => findLastOrNullBy(array, find, select)
}

export function yfFindLastOrNullBy<T, V extends T>(array: T[], select: ArrayMapper<T, V>) {
  return (find: V) => findLastOrNullBy(array, find, select)
}

export function yffFindLastOrNullBy<T, V extends T>(array: T[], find: V) {
  return (select: ArrayMapper<T, V>) => findLastOrNullBy(array, find, select)
}
