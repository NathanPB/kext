/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as A from "../src/array";
import {NoSuchElementError} from "../src";

describe('#findFirst', () => {
  const arr = [{ id: 1 }, { id: 2 }, { id: 1 }]

  it('Should throw', () =>
    expect(() => A.findFirst(arr, () => false)).toThrow()
  )

  it('Should find 1', () =>
    expect(A.findFirst(arr, i => i.id === 1)).toStrictEqual(arr[0])
  )

  it('Should invoke the predicate with the correct params', () => {
    const fn = jest.fn((i) => i === arr[2])
    A.findFirst(arr, fn)
    expect(fn).toHaveBeenNthCalledWith(1, arr[0], 0, arr)
    expect(fn).toHaveBeenNthCalledWith(2, arr[1], 1, arr)
    expect(fn).toHaveBeenNthCalledWith(3, arr[2], 2, arr)
  })
})

describe('#findLast', () => {
  const arr = [{ id: 1 }, { id: 2 }, { id: 1 }]

  it('Should throw', () =>
    expect(() => A.findLast(arr, () => false)).toThrow()
  )

  it('Should find 1', () =>
    expect(A.findLast(arr, i => i.id === 1)).toStrictEqual(arr[2])
  )

  it('Should invoke the predicate with the correct params', () => {
    const fn = jest.fn((i) => i === arr[0])
    A.findLast(arr, fn)
    expect(fn).toHaveBeenNthCalledWith(3, arr[0], 0, arr)
    expect(fn).toHaveBeenNthCalledWith(2, arr[1], 1, arr)
    expect(fn).toHaveBeenNthCalledWith(1, arr[2], 2, arr)
  })
})

describe('#findFirstBy', () => {
  const arr = [{ id: 1 }, { id: 2 }, { id: 1 }]

  it('Should throw', () =>
    expect(() => A.findFirstBy(arr, arr[0], () => arr[1])).toThrow()
  )

  it('Should find', () =>
    expect(A.findFirstBy(arr, arr[2], i => i)).toStrictEqual(arr[2])
  )

  it('Should invoke the predicate with the correct params', () => {
    const fn = jest.fn(i => i)
    A.findFirstBy(arr, arr[2], fn)
    expect(fn).toHaveBeenNthCalledWith(1, arr[0], 0, arr)
    expect(fn).toHaveBeenNthCalledWith(2, arr[1], 1, arr)
    expect(fn).toHaveBeenNthCalledWith(3, arr[2], 2, arr)
  })
})

describe('#findLastBy', () => {
  const arr = [{ id: 1 }, { id: 2 }, { id: 1 }]

  it('Should throw', () =>
    expect(() => A.findLastBy(arr, arr[0], () => arr[1])).toThrow()
  )

  it('Should find', () =>
    expect(A.findLastBy(arr, arr[0], i => i)).toStrictEqual(arr[0])
  )

  it('Should invoke the predicate with the correct params', () => {
    const fn = jest.fn(i => i)
    A.findLastBy(arr, arr[0], fn)
    expect(fn).toHaveBeenNthCalledWith(3, arr[0], 0, arr)
    expect(fn).toHaveBeenNthCalledWith(2, arr[1], 1, arr)
    expect(fn).toHaveBeenNthCalledWith(1, arr[2], 2, arr)
  })
})

describe('#findFirstOrNull', () => {
  const arr = [{ id: 1 }, { id: 2 }, { id: 1 }]

  it('Should find undefined', () =>
    expect(A.findFirstOrNull(arr, () => false)).toBeUndefined()
  )

  it('Should find 1', () =>
    expect(A.findFirstOrNull(arr, i => i.id === 1)).toStrictEqual(arr[0])
  )

  it('Should invoke the predicate with the correct params', () => {
    const fn = jest.fn((i) => i === arr[2])
    A.findFirstOrNull(arr, fn)
    expect(fn).toHaveBeenNthCalledWith(1, arr[0], 0, arr)
    expect(fn).toHaveBeenNthCalledWith(2, arr[1], 1, arr)
    expect(fn).toHaveBeenNthCalledWith(3, arr[2], 2, arr)
  })
})

describe('#findLastOrNull', () => {
  const arr = [{ id: 1 }, { id: 2 }, { id: 1 }]

  it('Should find undefined', () =>
    expect(A.findLastOrNull(arr, () => false)).toBeUndefined()
  )

  it('Should find 1', () =>
    expect(A.findLastOrNull(arr, i => i.id === 1)).toStrictEqual(arr[2])
  )

  it('Should invoke the predicate with the correct params', () => {
    const fn = jest.fn((i) => i === arr[0])
    A.findLastOrNull(arr, fn)
    expect(fn).toHaveBeenNthCalledWith(3, arr[0], 0, arr)
    expect(fn).toHaveBeenNthCalledWith(2, arr[1], 1, arr)
    expect(fn).toHaveBeenNthCalledWith(1, arr[2], 2, arr)
  })
})

test('#findFirstOrNullBy', () => {
  const sample = [
    { id: 'A', name: 'Joan' },
    { id: 'B', name: 'Nathan' },
    { id: 'C', name: 'Marcus' },
    { id: 'D', name: 'Cris' },
    { id: 'E', name: 'Nathan' }
  ]

  expect(A.findFirstOrNullBy(sample, 'Nathan', it => it.name)).toEqual({ id: 'B', name: 'Nathan' })
  expect(A.findFirstOrNullBy(sample, 'Pedro', it => it.name)).toEqual(undefined)
})

test('#findLastOrNullBy', () => {
  const sample = [
    { id: 'A', name: 'Joan' },
    { id: 'B', name: 'Nathan' },
    { id: 'C', name: 'Marcus' },
    { id: 'D', name: 'Cris' },
    { id: 'E', name: 'Nathan' }
  ]

  expect(A.findLastOrNullBy(sample, 'Nathan', it => it.name)).toEqual({ id: 'E', name: 'Nathan' })
  expect(A.findLastOrNullBy(sample, 'Pedro', it => it.name)).toEqual(undefined)
})

test('#findFirstNotNullable', () => {
  expect(() => A.findFirstNotNullable([])).toThrow(NoSuchElementError)
  expect(A.findFirstNotNullable([null, undefined, 0, 1])).toEqual(0)
})

test('#findLastNotNullable', () => {
  expect(() => A.findLastNotNullable([])).toThrow(NoSuchElementError)
  expect(A.findLastNotNullable([0, 1, null, undefined])).toEqual(1)
})
