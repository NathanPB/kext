/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as A from '../src/lib/array/existential'
import {
  yAll,
  yAny,
  yContains,
  yContainsAll,
  yfAll,
  yfAny,
  yfContains,
  yfContainsAll,
  yfNone,
  yNone
} from '../src/lib/array/existential.curry';

beforeAll(jest.restoreAllMocks)

it('#yAll', () => {
  const spy = jest.spyOn(A, 'all').mockImplementation(()=>true)
  const arr = [1]
  const fn = jest.fn()
  yAll(fn)(arr)
  expect(spy).toHaveBeenLastCalledWith(arr, fn)
})

it('#yfAll', () => {
  const spy = jest.spyOn(A, 'all').mockImplementation(()=>true)
  const arr = [1]
  const fn = jest.fn()
  yfAll(arr)(fn)
  expect(spy).toHaveBeenLastCalledWith(arr, fn)
})

it('#yAny', () => {
  const spy = jest.spyOn(A, 'any').mockImplementation(()=>true)
  const arr = [1]
  const fn = jest.fn()
  yAny(fn)(arr)
  expect(spy).toHaveBeenLastCalledWith(arr, fn)
})

it('#yfAny', () => {
  const spy = jest.spyOn(A, 'any').mockImplementation(()=>true)
  const arr = [1]
  const fn = jest.fn()
  yfAny(arr)(fn)
  expect(spy).toHaveBeenLastCalledWith(arr, fn)
})

it('#yNone', () => {
  const spy = jest.spyOn(A, 'none').mockImplementation(()=>true)
  const arr = [1]
  const fn = jest.fn()
  yNone(fn)(arr)
  expect(spy).toHaveBeenLastCalledWith(arr, fn)
})

it('#yfNone', () => {
  const spy = jest.spyOn(A, 'none').mockImplementation(()=>true)
  const arr = [1]
  const fn = jest.fn()
  yfNone(arr)(fn)
  expect(spy).toHaveBeenLastCalledWith(arr, fn)
})

it('#yContains', () => {
  const spy = jest.spyOn(A, 'contains').mockImplementation(()=>true)
  const arr = [1]
  yContains(2)(arr)
  expect(spy).toHaveBeenLastCalledWith(arr, 2)
})

it('#yfContains', () => {
  const spy = jest.spyOn(A, 'contains').mockImplementation(()=>true)
  const arr = [1]
  yfContains(arr)(2)
  expect(spy).toHaveBeenLastCalledWith(arr, 2)
})

it('#yContainsAll', () => {
  const spy = jest.spyOn(A, 'containsAll').mockImplementation(()=>true)
  const arr = [1]
  yContainsAll([2])(arr)
  expect(spy).toHaveBeenLastCalledWith(arr, [2])
})

it('#yfContainsAll', () => {
  const spy = jest.spyOn(A, 'containsAll').mockImplementation(()=>true)
  const arr = [1]
  yfContainsAll(arr)([2])
  expect(spy).toHaveBeenLastCalledWith(arr, [2])
})



