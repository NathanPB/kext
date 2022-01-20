/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {firstOrNull, toSet} from "./array";
import {throwExpr} from "./error";

/** Describes the possible keys of an enumerator. */
type EnumKey = string|number|symbol

/** Describes an enumerator of type `T` and values of type `V`. */
type Enumerator<T, V = any> = Record<EnumKey, V> & T

/**
 * Thrown in search functions when a specific `value` couldn't be found on `enumerator`.
 */
export class ValueNotFoundError<T, V> extends Error {
  constructor(public readonly value: V, public readonly enumerator: Enumerator<T>) {
    super(`Value ${value} not found on enum ${Object.keys(enumerator)}`);
    Object.setPrototypeOf(this, ValueNotFoundError.prototype)
  }
}

/**
 * Returns the length of an Enum.
 * @param enumerator The enum.
 */
export function length<T>(enumerator: Enumerator<T>): number {
  return  keys(enumerator).size
}

/**
 * Returns the key set of an enum.
 * @param enumerator The enum.
 */
export function keys<T>(enumerator: Enumerator<T>): Set<keyof T> {
  return toSet<keyof T>(Object.keys(enumerator) as any)
}

/**
 * Returns an array containing the values of an enum.
 * @param enumerator The enum.
 */
export function values<T, V>(enumerator: Enumerator<T,  V>): V[] {
  return Object.values(enumerator)
}

/**
 * Checks whether a key is in the keyset of an enum.
 * @param enumerator The num.
 * @param key The key to check if it's contained in `enumerator`.
 */
export function isKeyOf<T>(enumerator: Enumerator<T>, key: EnumKey): key is keyof T {
  return key in enumerator
}

/**
 * Checks whether a value is in the value set of an enum.
 * @param enumerator The enum.
 * @param value The value to check if it's contained in `enumerator`.
 */
export function isValueOf<T>(enumerator: Enumerator<T>, value: any): value is T {
  return Object.values(enumerator).includes(value)
}

/**
 * Checks whether a given value is contained in a certain of an enumerator.
 * @param enumerator The enum.
 * @param key The key that should check if the value is contained into.
 * @param value The value to perform the checks.
 */
export function valueIsSpecificKey<T>(enumerator: Enumerator<T>, key: keyof T, value: any): value is keyof T {
  return isValueOf(enumerator, value) && enumerator[key] === value
}

/**
 * Finds the first key on an enumerator that matches a specific value.
 * @param enumerator The enum.
 * @param search The value to be searched within the enum's values.
 * @param comparator Function used to check the equality between `search` and the enum values. Default is a strict equality check (a === b).
 */
export function firstKeyWithValueOf<K, V>(
  enumerator: Enumerator<K, V>,
  search: V | any,
  comparator: (search: V, enumValue: V)=>boolean = (search, enumValue) => search === enumValue
): keyof K {
  const [key] = firstOrNull(Object.entries(enumerator), ([_, v]) => comparator(search, v))
    ?? throwExpr(new ValueNotFoundError(search, enumerator))

  return key as keyof K
}

/**
 * Casts a given string value into a TS comprehensible type
 *
 * Usually a shorthand for Enum[findFirstKeyWithValue(Enum, 'foo')]
 *
 * @param enumerator The enum.
 * @param search The value to be searched within the enum's values.
 * @param comparator Function used to check the equality between `search` and the enum values. Default is a strict equality check (a === b).
 */
export function firstValue<K, V>(
  enumerator: Enumerator<K, V>,
  search: V | any,
  comparator: (search: V, enumValue: V)=>boolean = (search, enumValue) => search === enumValue
) : V {
  return enumerator[firstKeyWithValueOf(enumerator, search, comparator)]
}

/**
 * Builds a regular expression matching the keys of an enum.
 *
 * Regex special characters are **not** scaped from the enum names.
 *
 * @param enumerator The enum.
 * @param strict If true, the regex pattern will match ONLY the keys with no preceding or postceding characters. Otherwise, the regex will match keys that are found within any part of a string.
 * @param flags Flags of the regular expression.
 */
export function regexKeyMatcher<T>(enumerator: Enumerator<T>, strict: boolean = true, flags?: string): RegExp {
  const base = Object.keys(enumerator).join('|')
  return strict ? new RegExp(`^${base}$`) : new RegExp(base, flags)
}

/**
 * Builds a regular expression matching the values of an enum.
 *
 * The #toString function is used to transform the values into an string representation.
 * The regex special characters **are** escaped from the expression.
 *
 * @param enumerator The enum.
 * @param strict If true, the regex pattern will match ONLY the keys with no preceding or postceding characters. Otherwise, the regex will match keys that are found within any part of a string.
 * @param flags Flags of the regular expression.
 */
export function regexValueMatcher<T>(enumerator: Enumerator<T>, strict: boolean = true, flags?: string): RegExp {
  const base = Object.values(enumerator)
    .map(it => it.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'))
    .join('|')

  return strict ? new RegExp(`^${base}$`) : new RegExp(base, flags)
}

