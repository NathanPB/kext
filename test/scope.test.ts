/*
 * Copyright 2021 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {_also, _apply, _let, _run, _with, run, takeIf, takeUnless} from "../src/scope";

/* @ts-ignore */
import {compile} from "./utils";

test('_let', () => {
  const foo = _let(
    { firstName: 'Nathan' },
    it => ({ ...it, lastName: 'Bombana' })
  )

  expect(foo).toEqual({ firstName: 'Nathan', lastName: 'Bombana' })
})


test('_with', () => {
  const foo = _with(
    { firstName: 'Nathan' },
    function() { return { ...this, lastName: 'Bombana' } }
  )

  expect(foo).toEqual({ firstName: 'Nathan', lastName: 'Bombana' })
})

test('_run', () => {
  const f = function () {
    // @ts-ignore
    return { ...this, lastName: 'Bombana' }
  }.bind({ firstName: 'Nathan' })

  expect(_run(f)).toEqual({ firstName: 'Nathan', lastName: 'Bombana' })
})

test('_apply', () => {
  const f = function () {
    // @ts-ignore
    return { ...this, lastName: 'Bombana', warning: 'This object will not be returned by _apply' }
  }

  expect(_apply({ firstName: 'Nathan' }, f)).toEqual({ firstName: 'Nathan' })
})

test('_also', () => {
  const f = (it: any) => ({
    ...it,
    lastName: 'Bombana',
    warning: 'This object will not be returned by _apply'
  })

  expect(_also({ firstName: 'Nathan' }, f)).toEqual({ firstName: 'Nathan' })
})

describe('#takeIf', () => {
  test('runtime', () => {
    expect(takeIf(1, () => true)).toStrictEqual(1)
    expect(takeIf(1, () => false)).toStrictEqual(undefined)
    expect(takeIf(1, it => it === 1)).toStrictEqual(1)
    expect(takeIf(1, it => it === 0)).toStrictEqual(undefined)

    expect(takeIf(1, true)).toStrictEqual(1)
    expect(takeIf(1, false)).toStrictEqual(undefined)
  })

  test('compile time', () => {
    expect(() => compile(`takeIf('A' as Union, isA) === 'A'`)).not.toThrow()
    expect(() => compile(`takeIf('A' as Union, isA) === 'B'`)).toThrow()
  })
})

describe('#takeUnless', () => {
  test('runtime', () => {
    expect(takeUnless(1, () => true)).toStrictEqual(undefined)
    expect(takeUnless(1, () => false)).toStrictEqual(1)
    expect(takeUnless(1, it => it === 1)).toStrictEqual(undefined)
    expect(takeUnless(1, it => it === 0)).toStrictEqual(1)

    expect(takeUnless(1, true)).toStrictEqual(undefined)
    expect(takeUnless(1, false)).toStrictEqual(1)
  })

  test('compile time', () => {
    expect(() => compile(`takeUnless('A' as Union, isB) === 'A'`)).not.toThrow()
    expect(() => compile(`takeUnless('A' as Union, isB) === 'B'`)).toThrow()
  })
})

test('_run', () => {
  let mutable = 0
  run(() => {
    mutable = 1
  })

  expect(mutable).toStrictEqual(1)
})
