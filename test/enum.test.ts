/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {
  firstKeyWithValueOf,
  firstValue,
  isKeyOf,
  isValueOf,
  keys,
  length,
  regexKeyMatcher,
  regexValueMatcher,
  valueIsSpecificKey,
  ValueNotFoundError,
  values
} from "../src/enum";
import {toSet} from "../src/array";

enum EmptyEnum {

}

enum TestEnum {
  DEPOSIT = '00',
  WITHDRAW = '01',
}

describe('#keys', () => {
  it('Should be DEPOSIT and WITHDRAW', () =>
    expect(keys(TestEnum)).toEqual(toSet(['DEPOSIT', 'WITHDRAW']))
  )

  it('Should be empty array', () =>
    expect(keys(EmptyEnum)).toEqual(new Set())
  )
})

describe('#values', () => {
  it('Should be 00 and 01', () =>
    expect(values(TestEnum)).toEqual(['00', '01'])
  )

  it('Should be empty array', () =>
    expect(values(EmptyEnum)).toEqual([])
  )
})

describe('#length', () => {
  it('Should be 2', () => expect(length(TestEnum)).toEqual(2))
  it('Should be 0', () => expect(length(EmptyEnum)).toEqual(0))
})

describe('#isKeyOf', () => {
  it('Should be true', () => expect(isKeyOf(TestEnum, 'DEPOSIT')).toStrictEqual(true))
  it('Should be true', () => expect(isKeyOf(TestEnum, 'WITHDRAW')).toStrictEqual(true))
  it('Should be false', () => expect(isKeyOf(TestEnum, 'FOOBAR')).toStrictEqual(false))
})

describe('#isValueOf', () => {
  it('Should be true', () => expect(isValueOf(TestEnum, '00')).toStrictEqual(true))
  it('Should be true', () => expect(isValueOf(TestEnum, '01')).toStrictEqual(true))
  it('Should be false', () => expect(isValueOf(TestEnum, '02')).toStrictEqual(false))
})

describe('#valueIsSpecificKey', () => {
  it('Should be true', () =>
    expect(valueIsSpecificKey(TestEnum, 'DEPOSIT', '00')).toStrictEqual(true)
  )

  it('Should be true', () =>
    expect(valueIsSpecificKey(TestEnum, 'WITHDRAW', '01')).toStrictEqual(true)
  )

  it('Should be false', () =>
    expect(valueIsSpecificKey(TestEnum, 'DEPOSIT', '01')).toStrictEqual(false)
  )

  it('Should be false for not existing value', () =>
    expect(valueIsSpecificKey(TestEnum, 'DEPOSIT', '02')).toStrictEqual(false)
  )
})

describe('#firstKeyWithValueOf', () => {
  it('Should be DEPOSIT', () =>
    expect(firstKeyWithValueOf(TestEnum, '00')).toEqual('DEPOSIT')
  )

  it('Should be WITHDRAW', () =>
    expect(firstKeyWithValueOf(TestEnum, '01')).toEqual('WITHDRAW')
  )

  it('Should throw because the value was not found', () =>
    expect(() => firstKeyWithValueOf(TestEnum, '02'))
      .toThrowError(ValueNotFoundError)
  )
})

describe('#firstValue', () => {
  it('Should be DEPOSIT', () =>
    expect(firstValue(TestEnum, '00')).toEqual('00')
  )

  it('Should be WITHDRAW', () =>
    expect(firstValue(TestEnum, '01')).toEqual('01')
  )

  it('Should throw because the value was not found', () =>
    expect(() => firstValue(TestEnum, '02'))
      .toThrowError(ValueNotFoundError)
  )
})

describe('#regexKeyMatcher', () => {
  describe('strict', () => {
    const regex = regexKeyMatcher(TestEnum)
    it('Should match', () => expect('DEPOSIT').toMatch(regex))
    it('Should match', () => expect('WITHDRAW').toMatch(regex))
    it('Should not match', () => expect('FOOBAR').not.toMatch(regex))
  })

  describe('non strict', () => {
    const regex = regexKeyMatcher(TestEnum, false)
    it('Should match', () => expect('DEPOSIT').toMatch(regex))
    it('Should match', () => expect('--DEPOSIT--').toMatch(regex))
    it('Should not match', () => expect('--DEPO-SIT-').not.toMatch(regex))
  })

  describe('flags', () => {
    it('Should not have flags', () =>
      expect(regexKeyMatcher(TestEnum).flags).toEqual('')
    )

    it('Should have gi flags', () =>
      expect(regexKeyMatcher(TestEnum, false, 'gi').flags).toEqual('gi')
    )
  })
})

describe('#regexValueMatcher', () => {
  describe('strict', () => {
    const regex = regexValueMatcher(TestEnum)
    it('Should match', () => expect('00').toMatch(regex))
    it('Should match', () => expect('01').toMatch(regex))
    it('Should not match', () => expect('02').not.toMatch(regex))
  })

  describe('non strict', () => {
    const regex = regexValueMatcher(TestEnum, false)
    it('Should match', () => expect('00').toMatch(regex))
    it('Should match', () => expect('--00--').toMatch(regex))
    it('Should not match', () => expect('--0-0-').not.toMatch(regex))
  })

  describe('flags', () => {
    it('Should not have flags', () =>
      expect(regexValueMatcher(TestEnum).flags).toEqual('')
    )

    it('Should have gi flags', () =>
      expect(regexValueMatcher(TestEnum, false, 'gi').flags).toEqual('gi')
    )
  })
})
