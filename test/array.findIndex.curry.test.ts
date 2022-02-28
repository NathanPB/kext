/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as A from '../src/lib/array/findIndex';
import {
  yfFindIndexOfFirst,
  yfFindIndexOfLast,
  yfIndexOfFirst,
  yfIndexOfLast,
  yFindIndexOfFirst,
  yFindIndexOfLast,
  yIndexOfFirst,
  yIndexOfLast
} from '../src/lib/array/findIndex.curry'

// @ts-ignore
import {testCurried} from "./utils";

beforeEach(jest.restoreAllMocks)

test('#yIndexOfFirst', () => testCurried(yIndexOfFirst, A.indexOfFirst))
test('#yfIndexOfFirst', () => testCurried(yfIndexOfFirst, A.indexOfFirst))

test('#yIndexOfLast', () => testCurried(yIndexOfLast, A.indexOfLast))
test('#yfIndexOfLast', () => testCurried(yfIndexOfLast, A.indexOfLast))

test('#yFindIndexOfFirst', () => testCurried(yFindIndexOfFirst, A.findIndexOfFirst))
test('#yfFindIndexOfFirst', () => testCurried(yfFindIndexOfFirst, A.findIndexOfFirst))

test('#yFindIndexOfLast', () => testCurried(yFindIndexOfLast, A.findIndexOfLast))
test('#yfFindIndexOfLast', () => testCurried(yfFindIndexOfLast, A.findIndexOfLast))
