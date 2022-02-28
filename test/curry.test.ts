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
    const func = Y.curry2(fn)
    func(1)(0)
    expect(fn).toHaveBeenLastCalledWith(0, 1)
    expect((func as any).kext$baseFunction).toStrictEqual(fn)
  })

  it('#curry3', () => {
    const func = Y.curry3(fn)
    func(2)(1)(0)
    expect(fn).toHaveBeenLastCalledWith(0, 1, 2)
    expect((func as any).kext$baseFunction).toStrictEqual(fn)
  })

  it('#curry4', () => {
    const func = Y.curry4(fn)
    func(3)(2)(1)(0)
    expect(fn).toHaveBeenLastCalledWith(0, 1, 2, 3)
    expect((func as any).kext$baseFunction).toStrictEqual(fn)
  })
});

describe('#flip', () => {
  it('#flip2', () => {
    const func = Y.flip2(fn)
    func(1, 0)
    expect(fn).toHaveBeenLastCalledWith(0, 1)
    expect((func as any).kext$baseFunction).toStrictEqual(fn)
  })

  it('#flip3', () => {
    const func = Y.flip3(fn)
    func(2, 1, 0)
    expect(fn).toHaveBeenLastCalledWith(0, 1, 2)
    expect((func as any).kext$baseFunction).toStrictEqual(fn)
  })

  it('#flip4', () => {
    const func = Y.flip4(fn)
    func(3, 2, 1, 0)
    expect(fn).toHaveBeenLastCalledWith(0, 1, 2, 3)
    expect((func as any).kext$baseFunction).toStrictEqual(fn)
  })

  it('#flipSecond2', () => {
    const func = Y.flipSecond2(fn)
    func(1, 0)
    expect(fn).toHaveBeenLastCalledWith(0, 1)
    expect((func as any).kext$baseFunction).toStrictEqual(fn)
  })

  it('#flipSecond3', () => {
    const func = Y.flipSecond3(fn)
    func(1, 0, 2)
    expect(fn).toHaveBeenLastCalledWith(0, 1, 2)
    expect((func as any).kext$baseFunction).toStrictEqual(fn)
  })

  it('#flipSecond4', () => {
    const func = Y.flipSecond4(fn)
    func(1, 0, 2, 3)
    expect(fn).toHaveBeenLastCalledWith(0, 1, 2, 3)
    expect((func as any).kext$baseFunction).toStrictEqual(fn)
  })

  it('#flipThird3', () => {
    const func = Y.flipThird3(fn)
    func(2, 0, 1)
    expect(fn).toHaveBeenLastCalledWith(0, 1, 2)
    expect((func as any).kext$baseFunction).toStrictEqual(fn)
  })

  it('#flipThird4', () => {
    const func = Y.flipThird4(fn)
    func(2, 0, 1, 3)
    expect(fn).toHaveBeenLastCalledWith(0, 1, 2, 3)
    expect((func as any).kext$baseFunction).toStrictEqual(fn)
  })

  it('#flipFourth4', () => {
    const func = Y.flipFourth4(fn)
    func(3, 0, 1, 2)
    expect(fn).toHaveBeenLastCalledWith(0, 1, 2, 3)
    expect((func as any).kext$baseFunction).toStrictEqual(fn)
  })
});
