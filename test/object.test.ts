/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as O from '../src/object';
import {
  deepExtend,
  doesntHaveKey,
  hasKey,
  isObjectStrict,
  keysOfAll,
  notUndefined,
  yDoesntHaveKey,
  yfDoesntHaveKey,
  yfHasKey,
  yHasKey
} from '../src/object';

describe('#isObjectStrict', () => {
  it('Should fail for undefined', () => expect(isObjectStrict(undefined)).toBeFalsy())
  it('Should fail for null', () => expect(isObjectStrict(null)).toBeFalsy())
  it('Should fail for array', () => expect(isObjectStrict([])).toBeFalsy())
  it('Should fail for number', () => expect(isObjectStrict(0)).toBeFalsy())
  it('Should succeed for Date', () => expect(isObjectStrict(new Date())).toBeTruthy())
  it('Should succeed for obj', () => expect(isObjectStrict({})).toBeTruthy())
})

describe('#notUndefined', () => {
  it('Should succeed for truthy values', () => expect(notUndefined(1)).toBeTruthy())
  it('Should succeed for falsy values', () => expect(notUndefined(0)).toBeTruthy())
  it('Should succeed for null', () => expect(notUndefined(null)).toBeTruthy())
  it('Should fail for undefined', () => expect(notUndefined(undefined)).toBeFalsy())
})

describe('#hasKey', () => {
  it('Should be true', () => expect(hasKey({ foo: 1 }, 'foo')).toBeTruthy())
  it('Should be false', () => expect(hasKey({ foo: 1 }, 'bar')).toBeFalsy())
  it('Should be falsy for array', () => expect(hasKey([1, 2, 3], '0')).toBeFalsy())
});

describe('#doesntHaveKey', () => {
  it('Should be false', () => expect(doesntHaveKey({ foo: 1 }, 'foo')).toBeFalsy())
  it('Should be true', () => expect(doesntHaveKey({ foo: 1 }, 'bar')).toBeTruthy())
  it('Should be true for array', () => expect(doesntHaveKey([1, 2, 3], '0')).toBeTruthy())
})

describe('#keysOfAll', () => {
  it('Should mix the keys of objects', () =>
    expect(keysOfAll({ foo: '1' }, { bar: '2' })).toEqual(['foo', 'bar'])
  )

  it('Should remove duplicated keys', () =>
    expect(keysOfAll({ foo: '1' }, { bar: '2' }, { foo: '3' })).toEqual(['foo', 'bar'])
  )

  it('Should not compute arrays', () =>
    expect(keysOfAll([1, 2, 3])).toEqual([])
  )
})

describe('#deepExtend', () => {
  it('Should not try to deep extend arrays, primitives and null', () =>
    expect(deepExtend({}, { a: 1, b: [{ foo: 'bar' }], c: null }))
      .toEqual({ a: 1, b: [{ foo: 'bar' }], c: null })
  )

  it('Should not deep extend undefined', () =>
    expect(deepExtend({}, { a: undefined }))
      .toEqual({})
  )

  it('Should deep extend from multiple extensors', () =>
    expect(deepExtend({}, { a: 1 }, { b: 2 }))
      .toEqual({ a: 1, b: 2 })
  )

  it('Should prioritize base', () =>
    expect(deepExtend({ a: 1 }, { a: 2, b: 2 }))
      .toEqual({ a: 1, b: 2 })
  )

  it('Should prioritize extensor order', () =>
    expect(deepExtend({}, { a: 1 }, { a: 2, b:2 }))
      .toEqual({ a: 1, b: 2 })
  )

  it('Should extend recursively', () =>
    expect(
      deepExtend(
        { a: { bar: { innerbar1: 'bar 1' } } },
        { a: { bar: { innerbar2: 'bar 2' } } }
      )
    ).toEqual({
      a: {
        bar: {
          innerbar1: 'bar 1',
          innerbar2: 'bar 2',
        }
      }
    })
  )

  it('Mocked use case', () =>
    expect(
      deepExtend(
        { a: 1, b: null, d: { bar: 'this bar should be here' } },
        { a: 2, b: 2, c: 'foo', d: { bar: 'foo', foobar: 'ok too' } },
        { d: { foo: 'bar' }, f: 'f', g: [{ bondia: 'bondia' }] }
      )
    ).toEqual({
      a: 1, b: null, c: 'foo',
      d: { bar: 'this bar should be here', foobar: 'ok too', foo: 'bar' },
      f: 'f', g: [{ bondia: 'bondia' }]
    })
  )
})

describe('curry', () => {
  beforeEach(jest.restoreAllMocks)

  it('#yHasKey', () => {
    const spy = jest.spyOn(O, 'hasKey').mockImplementation(()=>false)
    const obj = {}
    yHasKey('foo')(obj)
    expect(spy).toHaveBeenLastCalledWith(obj, 'foo')
  })


  it('#yDoesntHaveKey', () => {
    const spy = jest.spyOn(O, 'doesntHaveKey').mockImplementation(()=>false)
    const obj = {}
    yDoesntHaveKey('foo')(obj)
    expect(spy).toHaveBeenLastCalledWith(obj, 'foo')
  })

  it('#yfHasKey', () => {
    const spy = jest.spyOn(O, 'hasKey').mockImplementation(()=>false)
    const obj = {}
    yfHasKey(obj)('foo')
    expect(spy).toHaveBeenLastCalledWith(obj, 'foo')
  })


  it('#yfDoesntHaveKey', () => {
    const spy = jest.spyOn(O, 'doesntHaveKey').mockImplementation(()=>false)
    const obj = {}
    yfDoesntHaveKey(obj)('foo')
    expect(spy).toHaveBeenLastCalledWith(obj, 'foo')
  })
})
