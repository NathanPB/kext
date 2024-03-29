/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as A from '../src/lib/array/existential'
import {
  yAll,
  yAny,
  yContains,
  yContainsAll,
  yfAll,
  yfAny,
  yfContains,
  yfContainsAll,
  yfNone,
  yNone
} from '../src/lib/array/existential.curry';

// @ts-ignore
import {testCurried} from "./utils";

it('#yAll', () => testCurried(yAll, A.all))
it('#yfAll', () => testCurried(yfAll, A.all))

it('#yAny', () => testCurried(yAny, A.any))
it('#yfAny', () => testCurried(yfAny, A.any))

it('#yNone', () => testCurried(yNone, A.none))
it('#yfNone', () => testCurried(yfNone, A.none))

it('#yContains', () => testCurried(yContains, A.contains))
it('#yfContains', () => testCurried(yfContains, A.contains))

it('#yContainsAll', () => testCurried(yContainsAll, A.containsAll))
it('#yfContainsAll', () => testCurried(yfContainsAll, A.containsAll))
