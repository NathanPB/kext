/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {elementAt, elementAtOrElse, elementAtOrElseBy, elementAtOrNull, firstOrElse, lastOrElse} from "./directAccess";

/**
 * Curried version of {@link elementAt}.
 * {@inheritDoc elementAt}
 */
export function yElementAt(index: number) {
  return <T> (array: T[]) => elementAt(array, index)
}

/**
 * Curried version of {@link elementAt}.
 * {@inheritDoc elementAt}
 */
export function yfElementAt<T>(array: T[]) {
  return (index: number) => elementAt(array, index)
}

/**
 * Curried version of {@link elementAtOrElse}.
 * {@inheritDoc elementAtOrElse}
 */
export function yElementAtOrElse<D>(index: number, defaultValue: D) {
  return <T> (array: T[]) => elementAtOrElse(array, index, defaultValue)
}

/**
 * Curried version of {@link elementAtOrElse}.
 * {@inheritDoc elementAtOrElse}
 */
export function yfElementAtOrElse<T, D>(array: T[], defaultValue: D) {
  return (index: number) => elementAtOrElse(array, index, defaultValue)
}

/**
 * Curried version of {@link elementAtOrElseBy}.
 * {@inheritDoc elementAtOrElse}
 */
export function yffElementAtOrElse<T>(array: T[], index: number) {
  return <D> (defaultValue: D) => elementAtOrElse(array, index, defaultValue)
}

/**
 * Curried version of {@link elementAtOrNull}.
 * {@inheritDoc elementAtOrNull}
 */
export function yElementAtOrNull(index: number) {
  return <T> (array: T[]) => elementAtOrNull(array, index)
}

/**
 * Curried version of {@link elementAtOrNull}.
 * {@inheritDoc elementAtOrNull}
 */
export function yfElementAtOrNull<T>(array: T[]) {
  return (index: number) => elementAtOrNull(array, index)
}

/**
 * Curried version of {@link elementAtOrElseBy}.
 * {@inheritDoc elementAtOrElseBy}
 */
export function yElementAtOrElseBy<D>(index: number, defaultValue: (index: number)=>D) {
  return <T> (array: T[]) => elementAtOrElseBy(array, index, defaultValue)
}

/**
 * Curried version of {@link elementAtOrElseBy}.
 * {@inheritDoc elementAtOrElseBy}
 */
export function yfElementAtOrElseBy<T, D>(array: T[], defaultValue: (index: number)=>D) {
  return (index: number) => elementAtOrElseBy(array, index, defaultValue)
}

/**
 * Curried version of {@link elementAtOrElseBy}.
 * {@inheritDoc elementAtOrElseBy}
 */
export function yffElementAtOrElseBy<T>(array: T[], index: number) {
  return <D> (defaultValue: (index: number)=>D) => elementAtOrElseBy(array, index, defaultValue)
}

/**
 * Curried version of {@link firstOrElse}.
 * {@inheritDoc firstOrElse}
 */
export function yFirstOrElse<D>(defaultValue: D) {
  return <T> (array: T[]) => firstOrElse(array, defaultValue)
}

/**
 * Curried version of {@link firstOrElse}.
 * {@inheritDoc firstOrElse}
 */
export function yfFirstOrElse<T>(array: T[]) {
  return <D> (defaultValue: D) => firstOrElse(array, defaultValue)
}

/**
 * Curried version of {@link lastOrElse}.
 * {@inheritDoc lastOrElse}
 */
export function yLastOrElse<D>(defaultValue: D) {
  return <T> (array: T[]) => lastOrElse(array, defaultValue)
}

/**
 * Curried version of {@link lastOrElse}.
 * {@inheritDoc lastOrElse}
 */
export function yfLastOrElse<T>(array: T[]) {
  return <D> (defaultValue: D) => lastOrElse(array, defaultValue)
}
