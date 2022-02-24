/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {doesntHaveKey, hasKey} from "./object";

/**
 * Curried version of {@link hasKey}.
 * @see yfHasKey
 * {@inheritDoc hasKey}
 */
export function yHasKey<K extends string>(key: K) {
  return function <T extends Record<string, any>>(object: T): object is T & { [key in K]: any } {
    return hasKey(object, key)
  }
}

/**
 * Curried version of {@link doesntHaveKey}.
 * @see yfDoesntHaveKey
 * {@inheritDoc doesntHaveKey}
 */
export function yDoesntHaveKey<K extends string>(key: K) {
  return function <T extends Record<string, any>>(object: T): object is Exclude<T, K> {
    return doesntHaveKey(object, key)
  }
}

/**
 * Curried version of {@hasKey}, flipped version of {@yHasKey}
 * @see yHasKey
 * {@inheritDoc hasKey}
 */
export function yfHasKey<T extends Record<string, any>>(object: T) {
  return <K extends string> (key: K) => yHasKey(key)(object)
}

/**
 * Curried version of {@doesntHaveKey}, flipped version of {@yDoesntHaveKey}
 * @see yDoesntHaveKey
 * {@inheritDoc hasKey}
 */
export function yfDoesntHaveKey<T extends Record<string, any>>(object: T) {
  return <K extends string> (key: K) => yDoesntHaveKey(key)(object)
}
