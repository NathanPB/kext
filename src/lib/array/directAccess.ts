/*
 * Copyright 2021 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {throwExpr} from "../../error";
import {NoSuchElementError} from "../../index";

export function elementAt<T>(array: T[], index: number): T {
  return index < 0 || index >= array.length ? throwExpr(new NoSuchElementError()) : array[index]
}

export function elementAtOrElse<T, D>(array: T[], index: number, defaultValue: D): T | D {
  return index < 0 || index >= array.length ? defaultValue : array[index]
}

export function elementAtOrNull<T>(array: T[], index: number): T | undefined {
  return elementAtOrElse(array, index, undefined)
}

export function elementAtOrElseBy<T, D>(array: T[], index: number, defaultValue: (index: number)=>D): T | D {
  return index < 0 || index >= array.length ? defaultValue(index) : array[index]
}

export function first<T>(array: T[]): T {
  return array.length > 0 ? array[0] : throwExpr(new NoSuchElementError())
}

export function last<T>(array: T[]): T {
  return array.length > 0 ? array[array.length-1] : throwExpr(new NoSuchElementError())
}

export function firstOrElse<T, D>(array: T[], defaultValue: D): T | D {
  return array.length === 0 ? defaultValue : array[0]
}

export function lastOrElse<T, D>(array: T[], defaultValue: D): T | D {
  return array.length === 0 ? defaultValue : array[array.length-1]
}

export function firstOrNull<T>(array: T[]): T | undefined {
  return array[0]
}

export function lastOrNull<T>(array: T[]): T | undefined {
  return array[array.length-1]
}
