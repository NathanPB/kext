/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as A from '../src/lib/array/directAccess';
import {
  yElementAt,
  yElementAtOrElse,
  yElementAtOrElseBy,
  yElementAtOrNull,
  yfElementAt,
  yfElementAtOrElse,
  yfElementAtOrElseBy,
  yfElementAtOrNull,
  yffElementAtOrElse,
  yffElementAtOrElseBy,
  yfFirstOrElse,
  yFirstOrElse,
  yfLastOrElse,
  yLastOrElse
} from '../src/lib/array/directAccess.curry';

beforeEach(jest.restoreAllMocks)

it('#yElementAt', () => {
  const spy = jest.spyOn(A, 'elementAt').mockImplementation(()=>{})
  const arr = [1]
  yElementAt(0)(arr)
  expect(spy).toHaveBeenLastCalledWith(arr, 0)
})

it('#yfElementAt', () => {
  const spy = jest.spyOn(A, 'elementAt').mockImplementation(()=>{})
  const arr = [1]
  yfElementAt(arr)(0)
  expect(spy).toHaveBeenLastCalledWith(arr, 0)
})

it('#yElementAtOrElse', () => {
  const spy = jest.spyOn(A, 'elementAtOrElse').mockImplementation(()=>{})
  const arr = [1]
  const def = 2
  yElementAtOrElse(0, def)(arr)
  expect(spy).toHaveBeenLastCalledWith(arr, 0, def)
})

it('yfElementAtOrElse', () => {
  const spy = jest.spyOn(A, 'elementAtOrElse').mockImplementation(()=>{})
  const arr = [1]
  const def = 2
  yfElementAtOrElse(arr, def)(0)
  expect(spy).toHaveBeenLastCalledWith(arr, 0, def)
})

it('yffElementAtOrElse', () => {
  const spy = jest.spyOn(A, 'elementAtOrElse').mockImplementation(()=>{})
  const arr = [1]
  const def = 2
  yffElementAtOrElse(arr, 0)(def)
  expect(spy).toHaveBeenLastCalledWith(arr, 0, def)
})

it('yElementAtOrNull', () => {
  const spy = jest.spyOn(A, 'elementAtOrNull').mockImplementation(()=>{})
  const arr = [1]
  yElementAtOrNull(0)(arr)
  expect(spy).toHaveBeenLastCalledWith(arr, 0)
})

it('yfElementAtOrNull', () => {
  const spy = jest.spyOn(A, 'elementAtOrNull').mockImplementation(()=>{})
  const arr = [1]
  yfElementAtOrNull(arr)(0)
  expect(spy).toHaveBeenLastCalledWith(arr, 0)
})

it('#yElementAtOrElseBy', () => {
  const spy = jest.spyOn(A, 'elementAtOrElseBy').mockImplementation(()=>{})
  const arr = [1]
  const fn = jest.fn()
  yElementAtOrElseBy(0, fn)(arr)
  expect(spy).toHaveBeenLastCalledWith(arr, 0, fn)
})

it('yfElementAtOrElseBy', () => {
  const spy = jest.spyOn(A, 'elementAtOrElseBy').mockImplementation(()=>{})
  const arr = [1]
  const fn = jest.fn()
  yfElementAtOrElseBy(arr, fn)(0)
  expect(spy).toHaveBeenLastCalledWith(arr, 0, fn)
})

it('yffElementAtOrElseBy', () => {
  const spy = jest.spyOn(A, 'elementAtOrElseBy').mockImplementation(()=>{})
  const arr = [1]
  const fn = jest.fn()
  yffElementAtOrElseBy(arr, 0)(fn)
  expect(spy).toHaveBeenLastCalledWith(arr, 0, fn)
})

it('yFirstOrElse', () => {
  const spy = jest.spyOn(A, 'firstOrElse').mockImplementation(()=>{})
  const arr = [1]
  yFirstOrElse(2)(arr)
  expect(spy).toHaveBeenLastCalledWith(arr, 2)
})

it('yfFirstOrElse', () => {
  const spy = jest.spyOn(A, 'firstOrElse').mockImplementation(()=>{})
  const arr = [1]
  yfFirstOrElse(arr)(2)
  expect(spy).toHaveBeenLastCalledWith(arr, 2)
})

it('yLastOrElse', () => {
  const spy = jest.spyOn(A, 'lastOrElse').mockImplementation(()=>{})
  const arr = [1]
  yLastOrElse(2)(arr)
  expect(spy).toHaveBeenLastCalledWith(arr, 2)
})

it('yfLastOrElse', () => {
  const spy = jest.spyOn(A, 'lastOrElse').mockImplementation(()=>{})
  const arr = [1]
  yfLastOrElse(arr)(2)
  expect(spy).toHaveBeenLastCalledWith(arr, 2)
})
