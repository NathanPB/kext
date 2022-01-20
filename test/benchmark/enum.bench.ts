/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {benchmarkSuite} from "@nathanpb/jest-bench";
import {
  isKeyOf,
  isValueOf,
  keys,
  length,
  regexKeyMatcher,
  regexValueMatcher,
  valueIsSpecificKey,
  values
} from "../../src/enum";

enum TestEnum {
  DEPOSIT = '00',
  WITHDRAW = '01',
  FOO = 'a',
  BAR = 'b',
  COCONUT = 'c',
  BONDIA = ':)',
  BOANOITE = 'ego non sum ovum'
}

benchmarkSuite('general', {
  ['#keys']: () => void keys(TestEnum),
  ['#values']: () => void values(TestEnum),
  ['#length']: () => void length(TestEnum),
  ['#regexKeyMatcher']: () => void regexKeyMatcher(TestEnum),
  ['#regexValueMatcher']: () => void regexValueMatcher(TestEnum)
})

benchmarkSuite('#isKeyOf', {
  ['best']: () => void isKeyOf(TestEnum, 'DEPOSIT'),
  ['avg']: () => void isKeyOf(TestEnum, 'BAR'),
  ['worst']: () => void isKeyOf(TestEnum, 'BOANOITE')
})

benchmarkSuite('#isValueOf', {
  ['best']: () => void isValueOf(TestEnum, TestEnum.DEPOSIT),
  ['avg']: () => void isValueOf(TestEnum, TestEnum.BAR),
  ['worst']: () => void isValueOf(TestEnum, TestEnum.BOANOITE)
})

benchmarkSuite('#valueIsSpecificKey', {
  ['best']: () => void valueIsSpecificKey(TestEnum, 'DEPOSIT', TestEnum.DEPOSIT),
  ['avg']: () => void valueIsSpecificKey(TestEnum, 'BAR', TestEnum.BAR),
  ['worst']: () => void valueIsSpecificKey(TestEnum, 'BOANOITE', TestEnum.BOANOITE),
  ['case not found']: () => { try { valueIsSpecificKey(TestEnum, 'BOANOITE', 'not container here') } catch(_) {} }
})
