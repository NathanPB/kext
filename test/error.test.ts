/*
 * Copyright 2021 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import fn = jest.fn;
import {runCatching, runCatching$, throwExpr} from "../src/error";

test('throwExpr', () => {
  expect(fn(() => throwExpr(new Error('foobar')))).toThrow('foobar')
})

describe('Result', () => {
  test('runCatching', () => {
    const resultFailure = runCatching(() => { throw 'foo' })
    const resultSuccess = runCatching(() => 'bar')

    expect(resultFailure.isFailure).toStrictEqual(true)
    expect(resultFailure.isSuccess).toStrictEqual(false)

    expect(resultSuccess.isFailure).toStrictEqual(false)
    expect(resultSuccess.isSuccess).toStrictEqual(true)
  })

  test('runCatching$', async () => {
    const resultFailure = await runCatching$(async () => { throw 'foo' })
    const resultSuccess = await runCatching$(async () => 'bar')

    expect(resultFailure.isFailure).toStrictEqual(true)
    expect(resultFailure.isSuccess).toStrictEqual(false)

    expect(resultSuccess.isFailure).toStrictEqual(false)
    expect(resultSuccess.isSuccess).toStrictEqual(true)
  })

  describe('error', () => {
    const error = new Error('foo')
    const result = runCatching(() => { throw error })

    test('result', () => {
      expect(result.result).toStrictEqual(undefined)
    })

    test('error', () => {
      expect(result.error).toStrictEqual(error)
    })

    test('errorOrUndefined', () => {
      expect(result.errorOrUndefined()).toStrictEqual(error)
    })

    test('getOrUndefined', () => {
      expect(result.getOrUndefined()).toStrictEqual(undefined)
    })

    test('getOrDefault', () => {
      expect(result.getOrDefault('default')).toStrictEqual('default')
    })

    test('getOrElse', () => {
      const callback = fn(() => 'recovered')
      expect(result.getOrElse(callback)).toStrictEqual('recovered')
      expect(callback).toBeCalledWith(error)
    })

    test('getOrThrow', () => {
      expect(() => result.getOrThrow()).toThrow(error)
    })

    test('fold', () => {
      const onSuccess = fn(() => 'finding joy on life')
      const onFailure = fn(() => 'this is more likely to happen')
      expect(result.fold({ onSuccess, onFailure })).toEqual('this is more likely to happen')
      expect(onSuccess).not.toBeCalled()
      expect(onFailure).toBeCalledWith(error)
    })

    test('map', () => {
      const callbackReturning = fn(() => 'foo')
      expect(result.map(callbackReturning)).toStrictEqual(result)
      expect(callbackReturning).not.toBeCalled()
    })

    test('mapCatching', () => {
      const callback = fn(() => { throw 'e' })
      const mapped = result.mapCatching(callback)

      expect(mapped).toStrictEqual(result)
      expect(callback).not.toBeCalled()
    })

    test('onFailure', () => {
      const callback = fn(() => 'foo')
      expect(result.onFailure(callback)).toBe(result)
      expect(callback).toBeCalledWith(error)
    })


    test('onSuccess', () => {
      const callback = fn(() => 'foo')
      expect(result.onSuccess(callback)).toBe(result)
      expect(callback).not.toBeCalled()
    })

    test('recover', () => {
      const callback = fn(() => 'foo')
      const recover = result.recover(callback)

      expect(recover.isSuccess).toStrictEqual(true)
      expect(recover.getOrUndefined()).toStrictEqual('foo')

      expect(callback).toBeCalledWith(error)
    })

    test('recoverCatching', () => {
      const callback = fn(() => 'foo')
      const recover = result.recoverCatching(callback)

      expect(recover.isSuccess).toStrictEqual(true)
      expect(recover.getOrUndefined()).toStrictEqual('foo')

      const errorOnRecovering = new Error('error on recovering')
      const callbackThrowing = fn(() => { throw errorOnRecovering})
      const recoverThrowing = result.recoverCatching(callbackThrowing)

      expect(recoverThrowing.isSuccess).toStrictEqual(false)
      expect(recoverThrowing.errorOrUndefined()).toStrictEqual(errorOnRecovering)
    })

    test('isSuccess', () => {
      expect(result.isSuccess).toStrictEqual(false)
    })

    test('isFailure', () => {
      expect(result.isFailure).toStrictEqual(true)
    })
  })

  describe('success', () => {
    const value = 'bar'
    const result = runCatching(() => value)

    test('result', () => {
      expect(result.result).toStrictEqual(value)
    })

    test('error', () => {
      expect(result.error).toStrictEqual(undefined)
    })

    test('errorOrUndefined', () => {
      expect(result.errorOrUndefined()).toStrictEqual(undefined)
    })

    test('getOrUndefined', () => {
      expect(result.getOrUndefined()).toStrictEqual(value)
    })

    test('getOrDefault', () => {
      expect(result.getOrDefault('default')).toStrictEqual(value)
    })

    test('getOrElse', () => {
      const callback = fn(() => 'recovered')
      expect(result.getOrElse(callback)).toStrictEqual(value)
      expect(callback).not.toBeCalled()
    })

    test('getOrThrow', () => {
      expect(result.getOrThrow()).toStrictEqual(value)
    })

    test('fold', () => {
      const onSuccess = fn(() => 'on success')
      const onFailure = fn(() => 'on failure')
      expect(result.fold({ onSuccess, onFailure })).toStrictEqual('on success')
      expect(onSuccess).toBeCalledWith(value)
      expect(onFailure).not.toBeCalled()
    })

    test('map', () => {
      const callback = fn(() => 'transformed value')
      const mapped = result.map(callback)

      expect(mapped.isSuccess).toStrictEqual(true)
      expect(mapped.getOrUndefined()).toStrictEqual('transformed value')
      expect(callback).toBeCalledWith(value)

      const error = new Error('error')
      const callbackThrowing = fn(() => { throw error })
      expect(fn(() => result.map(callbackThrowing))).toThrow(error)
    })

    test('mapCatching', () => {
      const callback = fn(() => 'transformed value')
      const mapped = result.mapCatching(callback)

      expect(mapped.isSuccess).toStrictEqual(true)
      expect(mapped.getOrUndefined()).toStrictEqual('transformed value')
      expect(callback).toBeCalledWith(value)

      const error = new Error('error')
      const callbackThrowing = fn(() => { throw error })
      const mappedThrowing = result.mapCatching(callbackThrowing)

      expect(mappedThrowing).not.toStrictEqual(result)
      expect(mappedThrowing.isFailure).toStrictEqual(true)
      expect(mappedThrowing.error).toStrictEqual(error)
    })

    test('onFailure', () => {
      const callback = fn(() => 'foo')
      expect(result.onFailure(callback)).toBe(result)
      expect(callback).not.toBeCalled()
    })


    test('onSuccess', () => {
      const callback = fn(() => 'foo')
      expect(result.onSuccess(callback)).toBe(result)
      expect(callback).toBeCalledWith(value)
    })

    test('recover', () => {
      const callback = fn(() => 'foo')
      const recover = result.recover(callback)

      expect(recover).toStrictEqual(result)
      expect(callback).not.toBeCalled()
    })

    test('recoverCatching', () => {
      const callback = fn(() => 'foo')
      const recover = result.recoverCatching(callback)

      expect(recover).toStrictEqual(result)
      expect(callback).not.toBeCalled()
    })

    test('isSuccess', () => {
      expect(result.isSuccess).toStrictEqual(true)
    })

    test('isFailure', () => {
      expect(result.isFailure).toStrictEqual(false)
    })
  })
})
