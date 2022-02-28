/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {elementAt, elementAtOrNull} from "./directAccess";
import {curry2, flipSecond2} from "../../curry";

/**
 * Curried version of {@link elementAt}.
 * {@inheritDoc elementAt}
 */
export const yElementAt = curry2(elementAt)

/**
 * Curried version of {@link elementAt}.
 * {@inheritDoc elementAt}
 */
export const yfElementAt = curry2(flipSecond2(elementAt))

/**
 * Curried version of {@link elementAtOrNull}.
 * {@inheritDoc elementAtOrNull}
 */
export const yElementAtOrNull = curry2(elementAtOrNull)

/**
 * Curried version of {@link elementAtOrNull}.
 * {@inheritDoc elementAtOrNull}
 */
export const yfElementAtOrNull = curry2(flipSecond2(elementAtOrNull))
