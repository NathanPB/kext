/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {findIndexOfFirst, findIndexOfLast, indexOfFirst, indexOfLast} from "../src/array";

const data = [0, 9, 1, 9, 2]

describe('#indexOfFirst', () => {
  test('return', () => {
    expect(indexOfFirst(data, 2)).toEqual(4)
    expect(indexOfFirst(data, 9)).toEqual(1)
    expect(indexOfFirst(data, 99)).toEqual(-1)
    expect(indexOfFirst(data, 90, it => it * 10)).toEqual(1)
  })

  test('callback params', () => {
    const fnWorst = jest.fn(() => 98)
    indexOfFirst(data, 99, fnWorst)

    expect(fnWorst).toHaveBeenCalledTimes(5)
    expect(fnWorst).toHaveBeenNthCalledWith(1, 0, 0, data)
    expect(fnWorst).toHaveBeenNthCalledWith(2, 9, 1, data)
    expect(fnWorst).toHaveBeenNthCalledWith(3, 1, 2, data)
    expect(fnWorst).toHaveBeenNthCalledWith(4, 9, 3, data)
    expect(fnWorst).toHaveBeenNthCalledWith(5, 2, 4, data)

    const fnBest = jest.fn(() => 0)
    indexOfFirst(data, 0, fnBest)
    expect(fnBest).toHaveBeenCalledTimes(1)
    expect(fnBest).toHaveBeenNthCalledWith(1, 0, 0, data)
  })
})

describe('#indexOfLast', () => {
  test('return', () => {
    expect(indexOfLast(data, 2)).toEqual(4)
    expect(indexOfLast(data, 9)).toEqual(3)
    expect(indexOfLast(data, 99)).toEqual(-1)
    expect(indexOfLast(data, 90, it => it * 10)).toEqual(3)
  })

  test('callback params', () => {
    const fnWorst = jest.fn(() => 98)
    indexOfLast(data, 99, fnWorst)

    expect(fnWorst).toHaveBeenCalledTimes(5)
    expect(fnWorst).toHaveBeenNthCalledWith(5, 0, 0, data)
    expect(fnWorst).toHaveBeenNthCalledWith(4, 9, 1, data)
    expect(fnWorst).toHaveBeenNthCalledWith(3, 1, 2, data)
    expect(fnWorst).toHaveBeenNthCalledWith(2, 9, 3, data)
    expect(fnWorst).toHaveBeenNthCalledWith(1, 2, 4, data)

    const fnBest = jest.fn(() => 0)
    indexOfLast(data, 0, fnBest)
    expect(fnBest).toHaveBeenCalledTimes(1)
    expect(fnBest).toHaveBeenNthCalledWith(1, 2, 4, data)
  })
})

describe('#findIndexOfFirst', () => {
  test('return', () => {
    expect(findIndexOfFirst(data, it => it === 2)).toEqual(4)
    expect(findIndexOfFirst(data, it => it === 9)).toEqual(1)
    expect(findIndexOfFirst(data, it => it === 99)).toEqual(-1)
  })

  test('callback params', () => {
    const fnWorst = jest.fn(() => false)
    findIndexOfFirst(data, fnWorst)

    expect(fnWorst).toHaveBeenCalledTimes(5)
    expect(fnWorst).toHaveBeenNthCalledWith(1, 0, 0, data)
    expect(fnWorst).toHaveBeenNthCalledWith(2, 9, 1, data)
    expect(fnWorst).toHaveBeenNthCalledWith(3, 1, 2, data)
    expect(fnWorst).toHaveBeenNthCalledWith(4, 9, 3, data)
    expect(fnWorst).toHaveBeenNthCalledWith(5, 2, 4, data)

    const fnBest = jest.fn(() => true)
    findIndexOfFirst(data, fnBest)
    expect(fnBest).toHaveBeenCalledTimes(1)
    expect(fnBest).toHaveBeenNthCalledWith(1, 0, 0, data)
  })
})

describe('#findIndexOfLast', () => {
  test('return', () => {
    expect(findIndexOfLast(data, it => it === 2)).toEqual(4)
    expect(findIndexOfLast(data, it => it === 9)).toEqual(3)
    expect(findIndexOfLast(data, it => it === 99)).toEqual(-1)
  })

  test('callback params', () => {
    const fnWorst = jest.fn(() => false)
    findIndexOfLast(data, fnWorst)

    expect(fnWorst).toHaveBeenCalledTimes(5)
    expect(fnWorst).toHaveBeenNthCalledWith(5, 0, 0, data)
    expect(fnWorst).toHaveBeenNthCalledWith(4, 9, 1, data)
    expect(fnWorst).toHaveBeenNthCalledWith(3, 1, 2, data)
    expect(fnWorst).toHaveBeenNthCalledWith(2, 9, 3, data)
    expect(fnWorst).toHaveBeenNthCalledWith(1, 2, 4, data)

    const fnBest = jest.fn(() => true)
    findIndexOfLast(data, fnBest)
    expect(fnBest).toHaveBeenCalledTimes(1)
    expect(fnBest).toHaveBeenNthCalledWith(1, 2, 4, data)
  })
})
