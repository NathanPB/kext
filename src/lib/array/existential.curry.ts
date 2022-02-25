/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


import {all, any, ArrayPredicate, contains, containsAll, none} from "../../array";

/**
 * Curried version of {@link all}.
 * {@inheritDoc all}
 */
export function yAll<T>(predicate: ArrayPredicate<T>) {
  return (array: T[]) => all(array, predicate)
}

/**
 * Curried version of {@link all}.
 * {@inheritDoc all}
 */
export function yfAll<T>(array: T[]) {
  return (predicate: ArrayPredicate<T>) => all(array, predicate)
}

/**
 * Curried version of {@link any}.
 * {@inheritDoc any}
 */
export function yAny<T>(predicate: ArrayPredicate<T>) {
  return (array: T[]) => any(array, predicate)
}

/**
 * Curried version of {@link any}.
 * {@inheritDoc any}
 */
export function yfAny<T>(array: T[]) {
  return (predicate: ArrayPredicate<T>) => any(array, predicate)
}

/**
 * Curried version of {@link none}.
 * {@inheritDoc none}
 */
export function yNone<T>(predicate: ArrayPredicate<T>) {
  return (array: T[]) => none(array, predicate)
}

/**
 * Curried version of {@link none}.
 * {@inheritDoc none}
 */
export function yfNone<T>(array: T[]) {
  return (predicate: ArrayPredicate<T>) => none(array, predicate)
}

/**
 * Curried version of {@link contains}.
 * {@inheritDoc contains}
 */
export function yContains<T>(element: T) {
  return (array: T[]) => contains(array, element)
}

/**
 * Curried version of {@link contains}.
 * {@inheritDoc contains}
 */
export function yfContains<T>(array: T[]) {
  return (element: T) => contains(array, element)
}

/**
 * Curried version of {@link containsAll}.
 * {@inheritDoc containsAll}
 */
export function yContainsAll<T>(elements: T[]) {
  return (array: T[]) => containsAll(array, elements)
}

/**
 * Curried version of {@link containsAll}.
 * {@inheritDoc containsAll}
 */
export function yfContainsAll<T>(array: T[]) {
  return (elements: T[]) => containsAll(array, elements)
}
