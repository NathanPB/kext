/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as A from '../src/lib/array/findElement';
import {
  yffFindFirstBy,
  yffFindFirstOrNullBy,
  yffFindLastBy,
  yffFindLastOrNullBy,
  yfFindFirst,
  yfFindFirstBy,
  yfFindFirstOrNull,
  yfFindFirstOrNullBy,
  yfFindLast,
  yfFindLastBy,
  yfFindLastOrNull,
  yfFindLastOrNullBy,
  yFindFirst,
  yFindFirstBy,
  yFindFirstOrNull,
  yFindFirstOrNullBy,
  yFindLast,
  yFindLastBy,
  yFindLastOrNull,
  yFindLastOrNullBy
} from '../src/lib/array/findElement.curry';

// @ts-ignore
import {testCurried} from "./utils";

beforeEach(jest.clearAllMocks)

const arr = [0]
const find = 0
const fn = jest.fn()

test('yFindFirst', () => testCurried(yFindFirst, A.findFirst))
test('yfFindFirst', () => testCurried(yfFindFirst, A.findFirst))

test('yFindLast', () => testCurried(yFindLast, A.findLast))
test('yfFindLast', () => testCurried(yfFindLast, A.findLast))

test('yFindFirstBy', () => {
  const spy = jest.spyOn(A, 'findFirstBy').mockImplementation(() => {})
  yFindFirstBy(find, fn)(arr)
  expect(spy).toHaveBeenLastCalledWith(arr, find, fn)
})

test('yfFindFirstBy', () => {
  const spy = jest.spyOn(A, 'findFirstBy').mockImplementation(() => {})
  yfFindFirstBy(arr, fn)(find)
  expect(spy).toHaveBeenLastCalledWith(arr, find, fn)
})

test('yffFindFirstBy', () => {
  const spy = jest.spyOn(A, 'findFirstBy').mockImplementation(() => {})
  yffFindFirstBy(arr, find)(fn)
  expect(spy).toHaveBeenLastCalledWith(arr, find, fn)
})

test('yFindLastBy', () => {
  const spy = jest.spyOn(A, 'findLastBy').mockImplementation(() => {})
  yFindLastBy(find, fn)(arr)
  expect(spy).toHaveBeenLastCalledWith(arr, find, fn)
})

test('yfFindLastBy', () => {
  const spy = jest.spyOn(A, 'findLastBy').mockImplementation(() => {})
  yfFindLastBy(arr, fn)(find)
  expect(spy).toHaveBeenLastCalledWith(arr, find, fn)
})

test('yffFindLastBy', () => {
  const spy = jest.spyOn(A, 'findLastBy').mockImplementation(() => {})
  yffFindLastBy(arr, find)(fn)
  expect(spy).toHaveBeenLastCalledWith(arr, find, fn)
})

test('yFindFirstOrNull', () => testCurried(yFindFirstOrNull, A.findFirstOrNull))
test('yfFindFirstOrNull', () => testCurried(yfFindFirstOrNull, A.findFirstOrNull))

test('yFindLastOrNull', () => testCurried(yFindLastOrNull, A.findLastOrNull))
test('yfFindLastOrNull', () => testCurried(yfFindLastOrNull, A.findLastOrNull))

test('yFindFirstOrNullBy', () => {
  const spy = jest.spyOn(A, 'findFirstOrNullBy').mockImplementation(() => {})
  yFindFirstOrNullBy(find, fn)(arr)
  expect(spy).toHaveBeenLastCalledWith(arr, find, fn)
})

test('yfFindFirstOrNullBy', () => {
  const spy = jest.spyOn(A, 'findFirstOrNullBy').mockImplementation(() => {})
  yfFindFirstOrNullBy(arr, fn)(find)
  expect(spy).toHaveBeenLastCalledWith(arr, find, fn)
})

test('yffFindFirstOrNullBy', () => {
  const spy = jest.spyOn(A, 'findFirstOrNullBy').mockImplementation(() => {})
  yffFindFirstOrNullBy(arr, find)(fn)
  expect(spy).toHaveBeenLastCalledWith(arr, find, fn)
})

test('yFindLastOrNullBy', () => {
  const spy = jest.spyOn(A, 'findLastOrNullBy').mockImplementation(() => {})
  yFindLastOrNullBy(find, fn)(arr)
  expect(spy).toHaveBeenLastCalledWith(arr, find, fn)
})

test('yfFindLastOrNullBy', () => {
  const spy = jest.spyOn(A, 'findLastOrNullBy').mockImplementation(() => {})
  yfFindLastOrNullBy(arr, fn)(find)
  expect(spy).toHaveBeenLastCalledWith(arr, find, fn)
})

test('yffFindLastOrNullBy', () => {
  const spy = jest.spyOn(A, 'findLastOrNullBy').mockImplementation(() => {})
  yffFindLastOrNullBy(arr, find)(fn)
  expect(spy).toHaveBeenLastCalledWith(arr, find, fn)
})
