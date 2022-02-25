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

describe('#elementAt', () => {
  it('Should crash when out of range', () => {
    expect(() => A.elementAt([0], -1)).toThrow(NoSuchElementError)
    expect(() => A.elementAt([0], 1)).toThrow(NoSuchElementError)
    expect(() => A.elementAt([], 0)).toThrow(NoSuchElementError)
  })

  it('Should find element at index', () => {
    expect(A.elementAt([0], 0)).toEqual(0)
  })
})

describe('#elementAtOrElse', () => {
  it('Should use the default value', () => {
    const obj = { foo: 'bar' }
    expect(A.elementAtOrElse([0], -1, obj)).toStrictEqual(obj)
    expect(A.elementAtOrElse([0], 1, obj)).toStrictEqual(obj)
    expect(A.elementAtOrElse([], 0, obj)).toStrictEqual(obj)
  })

  it('Should find element at index', () => {
    expect(A.elementAtOrElse([0], 0, 1)).toEqual(0)
  })
})

describe('#elementAtOrNull', () => {
  it('Should be undefined', () => {
    expect(A.elementAtOrNull([0], -1)).toBeUndefined()
    expect(A.elementAtOrNull([0], 1)).toBeUndefined()
    expect(A.elementAtOrNull([], 0)).toBeUndefined()
  })

  it('Should find element at index', () => {
    expect(A.elementAtOrNull([0], 0)).toEqual(0)
  })
})

describe('#elementAtOrElseBy', () => {
  it('Should use the default value', () => {
    const obj = { foo: 'bar' }
    const fn1 = jest.fn(() => obj)
    const fn2 = jest.fn(() => obj)
    const fn3 = jest.fn(() => obj)

    expect(A.elementAtOrElseBy([0], -1, fn1)).toStrictEqual(obj)
    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn1).toHaveBeenCalledWith(-1)

    expect(A.elementAtOrElseBy([0], 1, fn2)).toStrictEqual(obj)
    expect(fn2).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenCalledWith(1)

    expect(A.elementAtOrElseBy([], 0, fn3)).toStrictEqual(obj)
    expect(fn3).toHaveBeenCalledTimes(1)
    expect(fn3).toHaveBeenCalledWith(0)
  })

  it('Should find element at index', () => {
    expect(A.elementAtOrElseBy([0], 0, () => 1)).toEqual(0)
  })
});

describe('#first', () => {
  it('Should throw', () => {
    expect(() => A.first([])).toThrow(NoSuchElementError)
  })

  it('Should find the first element', () => {
    expect(A.first([-1, 0, 1])).toEqual(-1)
  })
})

describe('#last', () => {
  it('Should throw', () => {
    expect(() => A.last([])).toThrow(NoSuchElementError)
  })

  it('Should find the last element', () => {
    expect(A.last([-1, 0, 1])).toEqual(1)
  })
})

describe('#firstOrElse', () => {
  it('Should return the default element', () => {
    expect(A.firstOrElse([], 'foo')).toEqual('foo')
  })

  it('Should find the first element', () => {
    expect(A.firstOrElse([-1, 0, 1], 'foo')).toEqual(-1)
  })
})

describe('#lastOrElse', () => {
  it('Should return the default element', () => {
    expect(A.lastOrElse([], 'foo')).toEqual('foo')
  })

  it('Should find the last element', () => {
    expect(A.lastOrElse([-1, 0, 1], 'foo')).toEqual(1)
  })
})


describe('#firstOrNull', () => {
  it('Should return undefined', () => {
    expect(A.firstOrNull([])).toBeUndefined()
  })

  it('Should find the first element', () => {
    expect(A.firstOrNull([-1, 0, 1])).toEqual(-1)
  })
})

describe('#lastOrNull', () => {
  it('Should return the default element', () => {
    expect(A.lastOrNull([])).toBeUndefined()
  })

  it('Should find the last element', () => {
    expect(A.lastOrNull([-1, 0, 1])).toEqual(1)
  })
})
