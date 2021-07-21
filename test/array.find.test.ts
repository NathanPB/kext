/*
 * Copyright 2021 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as A from "../src/array";

test('all', () => {
  expect(A.all([-2, -1, 0, 1, 2], it => it > 0)).toBeFalsy()
  expect(A.all([0, 1, 2], it => it > 0)).toBeFalsy()
  expect(A.all([1, 2], it => it > 0)).toBeTruthy()
})


test('any', () => {
  expect(A.any([-2, -1, 0, 1, 2], it => it > 0)).toBeTruthy()
  expect(A.any([0, 1, 2], it => it > 0)).toBeTruthy()
  expect(A.any([1, 2], it => it > 0)).toBeTruthy()
  expect(A.any([-2, -1], it => it > 0)).toBeFalsy()
})


test('contains', () => {
  expect(A.contains([0, 1, 2], 1)).toBeTruthy()
  expect(A.contains([0, 1, 2], 4)).toBeFalsy()
})

test('containsAll', () => {
  expect(A.containsAll([0, 1, 2], [1])).toBeTruthy()
  expect(A.containsAll([0, 1, 2], [4])).toBeFalsy()

  expect(A.containsAll([0, 1, 2], [1, 2])).toBeTruthy()
  expect(A.containsAll([0, 1, 2], [1, 4])).toBeFalsy()

  expect(A.containsAll([0, 1, 2], [])).toBeTruthy()
})

test('firstOrNullBy', () => {
  const sample = [
    { id: 'A', name: 'Joan' },
    { id: 'B', name: 'Nathan' },
    { id: 'C', name: 'Marcus' },
    { id: 'D', name: 'Cris' },
    { id: 'E', name: 'Nathan' }
  ]

  expect(A.firstOrNullBy(sample, 'Nathan', it => it.name)).toEqual({ id: 'B', name: 'Nathan' })
  expect(A.firstOrNullBy(sample, 'Pedro', it => it.name)).toEqual(undefined)
})

test('firstOrNullByTransforming', () => {
  const sample = [
    { id: 'A', name: 'Joan' },
    { id: 'B', name: 'Nathan' },
    { id: 'C', name: 'Marcus' },
    { id: 'D', name: 'Cris' },
    { id: 'E', name: 'Nathan' }
  ]

  expect(A.firstOrNullByTransforming(sample, 'Nathan', it => it.name, it => it.id)).toStrictEqual('B')
  expect(A.firstOrNullByTransforming(sample, 'Pedro', it => it.name, it => it.id)).toEqual(undefined)
})

test('lastOrNullBy', () => {
  const sample = [
    { id: 'A', name: 'Joan' },
    { id: 'B', name: 'Nathan' },
    { id: 'C', name: 'Marcus' },
    { id: 'D', name: 'Cris' },
    { id: 'E', name: 'Nathan' }
  ]

  expect(A.lastOrNullBy(sample, 'Nathan', it => it.name)).toEqual({ id: 'E', name: 'Nathan' })
  expect(A.lastOrNullBy(sample, 'Pedro', it => it.name)).toEqual(undefined)
})

test('firstOrNullByTransforming', () => {
  const sample = [
    { id: 'A', name: 'Joan' },
    { id: 'B', name: 'Nathan' },
    { id: 'C', name: 'Marcus' },
    { id: 'D', name: 'Cris' },
    { id: 'E', name: 'Nathan' }
  ]

  expect(A.lastOrNullByTransforming(sample, 'Nathan', it => it.name, it => it.id)).toStrictEqual('E')
  expect(A.lastOrNullByTransforming(sample, 'Pedro', it => it.name, it => it.id)).toEqual(undefined)
})
