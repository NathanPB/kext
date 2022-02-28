/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


import {all, any, contains, containsAll, none} from "./existential";
import {curry2, flipSecond2} from "../../curry";

/**
 * Curried version of {@link all}.
 * {@inheritDoc all}
 */
export const yAll = curry2(all)

/**
 * Curried version of {@link all}.
 * {@inheritDoc all}
 */
export const yfAll = curry2(flipSecond2(all))

/**
 * Curried version of {@link any}.
 * {@inheritDoc any}
 */
export const yAny = curry2(any)

/**
 * Curried version of {@link any}.
 * {@inheritDoc any}
 */
export const yfAny = curry2(flipSecond2(any))

/**
 * Curried version of {@link none}.
 * {@inheritDoc none}
 */
export const yNone = curry2(none)

/**
 * Curried version of {@link none}.
 * {@inheritDoc none}
 */
export const yfNone = curry2(flipSecond2(none))

/**
 * Curried version of {@link contains}.
 * {@inheritDoc contains}
 */
export const yContains = curry2(contains)

/**
 * Curried version of {@link contains}.
 * {@inheritDoc contains}
 */
export const yfContains = curry2(flipSecond2(contains))

/**
 * Curried version of {@link containsAll}.
 * {@inheritDoc containsAll}
 */
export const yContainsAll = curry2(containsAll)

/**
 * Curried version of {@link containsAll}.
 * {@inheritDoc containsAll}
 */
export const yfContainsAll = curry2(flipSecond2(containsAll))
