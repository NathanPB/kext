/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

export * as Array from './array'
export * as Chainer from './chainer'
export * as Enum from './enum'
export * as Error from './error'
export * as Math from './math'
export * as Object from './object'
export * as Random from './random'
export * as Scope from './scope'

/**
 * Represents a type which a key is associated with a value.
 */
export type Pair<K, V> = [K, V]

/**
 * Represents a type which it's data can safely be compared, excluding nullables.
 */
export type ComparableSafe = string | number | boolean | undefined | null

export class NoSuchElementError extends Error {
  constructor() {
    super()
    Object.setPrototypeOf(this, NoSuchElementError.prototype)
  }
}
