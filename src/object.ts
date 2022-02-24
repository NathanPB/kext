/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {distinct} from "./lib/array";
import {yfDoesntHaveKey, yHasKey} from './object.curry';

export * from './object.curry';

/**
 * Checks if the `object` parameter is an object (not array or null).
 * @param object
 */
export function isObjectStrict(object?: any): object is Exclude<object, Array<any>> {
  return typeof object === 'object' && !Array.isArray(object) && object !== null
}

/**
 * Checks if the object is not undefined.
 * @param object
 */
export function notUndefined<T>(object?: T): object is T {
  return object !== undefined
}

/**
 * Checks if the object `object` has the key `key`.
 * @param object
 * @param key
 */
export function hasKey<T extends Record<string, any>, K extends string>(object: T, key: K): object is T & { [key in K]: any } {
  return !Array.isArray(object) && notUndefined(object[key])
}

/**
 * Checks if the object `object` does not have the key `key`.
 * @param object
 * @param key
 */
export function doesntHaveKey<T extends Record<string, any>, K extends string>(object: T, key: K): object is Exclude<T, K> {
  return !hasKey(object, key)
}

/**
 * Returns a distinct array with all the keys of `objects`.
 * @param objects
 */
export function keysOfAll(...objects: object[]): string[] {
  return distinct(objects.filter(isObjectStrict).map(Object.keys).flat())
}

/**
 * Deep extends an object with a list of extensors.
 * No deep properties from `base` will be ever subscribed.
 * The order of `extensors` define it's priority, the lower the index, the higher the priority.
 *
 * @example
 * ```ts
 * const extended = deepExtend(
 *  { a: 1, b: null, d: { bar: 'this bar should be here' } },
 *  { a: 2, b: 2, c: 'foo', d: { bar: 'foo', foobar: 'ok too' } },
 *  { d: { foo: 'bar' }, f: 'f', g: [{ bondia: 'bondia' }] }
 *)
 *
 * console.log(extended)
 * // > { a: 1, b: null, d: { bar: 'this bar should be here', foobar: 'ok too', foo: 'bar' }, c: 'foo', f: 'f', g: [ { bondia: 'bondia' } ] }
 * ```
 *
 * @param base - The base object to be extended
 * @param extensors - The extensors to inherit properties
 * @experimental
 */
export function deepExtend<T extends object, E extends object>(base:  T, ...extensors:  E[]): T & Record<string, any> {
  if (!isObjectStrict(base)) return base

  const difference = keysOfAll(...extensors.filter(isObjectStrict))
    .filter(yfDoesntHaveKey(base))
    .map(key => {
      const firstValue = extensors.find(yHasKey(key))
      return { [key]: firstValue && firstValue[key] }
    })
    .reduce((baseObj, partialObj) => ({ ...baseObj, ...partialObj }), {})

  return Object.fromEntries(
    Object.entries({ ...base, ...difference })
      .map(([key, value]) => [
        key, value === undefined
          ? extensors.filter(yHasKey(key)).find(isObjectStrict)
          : deepExtend(value, ...extensors.filter(yHasKey(key)).map(it => it[key]))
      ])
  ) as any
}
