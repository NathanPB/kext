/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {chainer} from "../src/chainer";

describe('#chainer', () => {
  it('Should have value of foo', () =>
    expect(chainer('foo').value).toEqual('foo')
  )

  it('Should apply the function and return a new chainer with the next value', () => {
    const fn = jest.fn(() => 'bar')
    const chain = chainer('foo').next(fn)
    expect(fn).toBeCalledTimes(1)
    expect(fn).toBeCalledWith('foo')
    expect(chain.value).toEqual('bar')
  })

  it('Should apply the function and return a promise with the next value', async () => {
    const fn = jest.fn(() => Promise.resolve('bar'))
    const chain = chainer('foo').then(fn)
    expect(fn).toBeCalledTimes(1)
    expect(fn).toBeCalledWith('foo')
    expect(await chain).toEqual('bar')
  })

  it('Should chain sync calls', () => {
    const p1 = (input: string) => input + 'A'
    const p2 = (input: string) => input + 'B'
    const p3 = (input: string) => input + 'C'

    const { value } = chainer('foobar')
      .next(p1)
      .next(p2)
      .next(p3)

    expect(value).toEqual('foobarABC')
  })

  it('Should chain async calls', async () => {
    const p1 = async (input: string) => input + 'A'
    const p2 = async (input: string) => input + 'B'
    const p3 = async (input: string) => input + 'C'

    const value = await chainer('foobar')
      .then(p1)
      .then(p2)
      .then(p3)

    expect(value).toEqual('foobarABC')
  })


  it('Should chain sync calls, then async calls', async () => {
    const p1 = (input: string) => input + 'A'
    const p2 = (input: string) => input + 'B'
    const p3 = async (input: string) => input + 'C'

    const value = await chainer('foobar')
      .next(p1)
      .next(p2)
      .then(p3)

    expect(value).toEqual('foobarABC')
  })
})
