/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as A from '../src/lib/array/findIndex';
import {
  yfFindIndexOfFirst,
  yfFindIndexOfLast,
  yfIndexOfFirst,
  yfIndexOfLast,
  yFindIndexOfFirst,
  yFindIndexOfLast,
  yIndexOfFirst,
  yIndexOfLast
} from '../src/lib/array/findIndex.curry'

beforeEach(jest.restoreAllMocks)

const arr = [0]
const find = 0
const fn = jest.fn()

test('#yIndexOfFirst', () => {
  const spy = jest.spyOn(A, 'indexOfFirst').mockImplementation(() => 0)
  yIndexOfFirst(find, fn)(arr)
  expect(spy).toHaveBeenLastCalledWith(arr, find, fn)
})

test('#yfIndexOfFirst', () => {
  const spy = jest.spyOn(A, 'indexOfFirst').mockImplementation(() => 0)
  yfIndexOfFirst(arr, fn)(find)
  expect(spy).toHaveBeenLastCalledWith(arr, find, fn)
})

test('#yIndexOfLast', () => {
  const spy = jest.spyOn(A, 'indexOfLast').mockImplementation(() => 0)
  yIndexOfLast(find, fn)(arr)
  expect(spy).toHaveBeenLastCalledWith(arr, find, fn)
})

test('#yfIndexOfLast', () => {
  const spy = jest.spyOn(A, 'indexOfLast').mockImplementation(() => 0)
  yfIndexOfLast(arr, fn)(find)
  expect(spy).toHaveBeenLastCalledWith(arr, find, fn)
})

test('#yFindIndexOfFirst', () => {
  const spy = jest.spyOn(A, 'findIndexOfFirst').mockImplementation(() => 0)
  yFindIndexOfFirst(fn)(arr)
  expect(spy).toHaveBeenLastCalledWith(arr, fn)
})

test('#yfFindIndexOfFirst', () => {
  const spy = jest.spyOn(A, 'findIndexOfFirst').mockImplementation(() => 0)
  yfFindIndexOfFirst(arr)(fn)
  expect(spy).toHaveBeenLastCalledWith(arr, fn)
})

test('#yFindIndexOfLast', () => {
  const spy = jest.spyOn(A, 'findIndexOfLast').mockImplementation(() => 0)
  yFindIndexOfLast(fn)(arr)
  expect(spy).toHaveBeenLastCalledWith(arr, fn)
})

test('#yfFindIndexOfLast', () => {
  const spy = jest.spyOn(A, 'findIndexOfLast').mockImplementation(() => 0)
  yfFindIndexOfLast(arr)(fn)
  expect(spy).toHaveBeenLastCalledWith(arr, fn)
})
