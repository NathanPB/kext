/*
 * Copyright 2021 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Generates a random floating point number between `from` and `to`.
 *
 * Delegates the `Math.random`'s PRNG algorithm to randomness.
 *
 * @param from Lower boundary to the generated value (inclusive).
 * @param to Upper boundary to the generated value (exclusive). Defaults to `Number.MAX_VALUE`.
 * @returns A floating point number between `from` and `to`.
 */
// https://stackoverflow.com/a/7228322/9893963
// https://stackoverflow.com/a/66083436/9893963
export function nextDouble(from: number = 0, to: number = Number.MAX_VALUE): number {
  return Math.random() * (to - from) + from
}

/**
 * Generates a random integer number between `from` and `to`.
 *
 * Delegates the `Math.random`'s PRNG algorithm to randomness.
 *
 * @param from Lower boundary to the generated value (inclusive).
 * @param to Upper boundary to the generated value (exclusive). Defaults to `Number.MAX_SAFE_INTEGER`.
 * @returns A floating point number between `from` and `to`.
 */
export function nextInt(from: number = 0, to: number = Number.MAX_SAFE_INTEGER): number {
  return Math.floor(nextDouble(from, to))
}

/**
 * Generates a random boolean.
 *
 * The `ratio` param is used to determine the chance of the boolean being `true` or `false`.
 *
 * For instance:
 *  - If `ratio` is `.5`, the chance of being `true` or `false` is 50%.
 *  - If `ratio` is `.1`, the chance of being `true` is 10%, and of being `false` is 90%.
 *  - If `ratio` is `.9`, the chance of being `true` is 90%, and of being `false` is 10%.
 *  - If `ratio` is `1` or greater, the chance of being `true` is 100%.
 *  - If `ratio` is `0` or lower, the chance of being `true` is 0%.
 *
 * @param ratio The ratio (between `0` and `1`) which the boolean is determined to be `true` or `false`. The greater the number, the greater the chance of being true.
 * @returns A random boolean.
 */
export function nextBoolean(ratio: number = .5): boolean {
  return Math.random() < ratio
}
