/*
 * Copyright 2021 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import * as A from './findIndex'
import {curry2, flipSecond2} from "../../curry";

/**
 * Curried version of {@link indexOfFirst}.
 * @inheritDoc indexOfFirst
 */
export const yIndexOfFirst = curry2(A.indexOfFirst)

/**
 * Curried version of {@link indexOfFirst}.
 * @inheritDoc indexOfFirst
 */
export const yfIndexOfFirst = curry2(flipSecond2(A.indexOfFirst))

/**
 * Curried version of {@link indexOfLast}.
 * @inheritDoc indexOfLast
 */
export const yIndexOfLast = curry2(A.indexOfLast)

/**
 * Curried version of {@link indexOfLast}.
 * @inheritDoc indexOfLast
 */
export const yfIndexOfLast = curry2(flipSecond2(A.indexOfLast))

/**
 * Curried version of {@link findIndexOfFirst}.
 * @inheritDoc findIndexOfFirst
 */
export const yFindIndexOfFirst = curry2(A.findIndexOfFirst)

/**
 * Curried version of {@link findIndexOfFirst}.
 * @inheritDoc findIndexOfFirst
 */
export const yfFindIndexOfFirst = curry2(flipSecond2(A.findIndexOfFirst))

/**
 * Curried version of {@link findIndexOfLast}.
 * @inheritDoc findIndexOfLast
 */
export const yFindIndexOfLast = curry2(A.findIndexOfLast)

/**
 * Curried version of {@link findIndexOfLast}.
 * @inheritDoc findIndexOfLast
 */
export const yfFindIndexOfLast = curry2(flipSecond2(A.findIndexOfLast))
