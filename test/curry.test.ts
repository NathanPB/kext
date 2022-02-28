/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as Y from '../src/curry'

const fn = jest.fn()

beforeEach(fn.mockClear)
afterEach(() => expect(fn).toBeCalledTimes(1))

describe('#curry', () => {
  it('#curry2', () => {
    Y.curry2(fn)(1)(0)
    expect(fn).toHaveBeenLastCalledWith(0, 1)
  })

  it('#curry3', () => {
    Y.curry3(fn)(2)(1)(0)
    expect(fn).toHaveBeenLastCalledWith(0, 1, 2)
  })

  it('#curry4', () => {
    Y.curry4(fn)(3)(2)(1)(0)
    expect(fn).toHaveBeenLastCalledWith(0, 1, 2, 3)
  })

  it('#curryFirst3', () => {
    Y.curryFirst3(fn)(1, 2)(0)
    expect(fn).toHaveBeenLastCalledWith(0, 1, 2)
  })

  it('#curryFirst4', () => {
    Y.curryFirst4(fn)(1, 2, 3)(0)
    expect(fn).toHaveBeenLastCalledWith(0, 1, 2, 3)
  })
});

describe('#flip', () => {
  it('#flip2', () => {
    Y.flip2(fn)(1, 0)
    expect(fn).toHaveBeenLastCalledWith(0, 1)
  })

  it('#flip3', () => {
    Y.flip3(fn)(2, 1, 0)
    expect(fn).toHaveBeenLastCalledWith(0, 1, 2)
  })

  it('#flip4', () => {
    Y.flip4(fn)(3, 2, 1, 0)
    expect(fn).toHaveBeenLastCalledWith(0, 1, 2, 3)
  })

  it('#flipSecond2', () => {
    Y.flipSecond2(fn)(1, 0)
    expect(fn).toHaveBeenLastCalledWith(0, 1)
  })

  it('#flipSecond3', () => {
    Y.flipSecond3(fn)(1, 0, 2)
    expect(fn).toHaveBeenLastCalledWith(0, 1, 2)
  })

  it('#flipSecond4', () => {
    Y.flipSecond4(fn)(1, 0, 2, 3)
    expect(fn).toHaveBeenLastCalledWith(0, 1, 2, 3)
  })

  it('#flipThird3', () => {
    Y.flipThird3(fn)(2, 0, 1)
    expect(fn).toHaveBeenLastCalledWith(0, 1, 2)
  })

  it('#flipThird4', () => {
    Y.flipThird4(fn)(2, 0, 1, 3)
    expect(fn).toHaveBeenLastCalledWith(0, 1, 2, 3)
  })

  it('#flipFourth4', () => {
    Y.flipFourth4(fn)(3, 0, 1, 2)
    expect(fn).toHaveBeenLastCalledWith(0, 1, 2, 3)
  })
});
