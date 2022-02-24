/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Takes `value` and apply it to `next`. Use it's result to create a new chainer.
 * @param next
 * @see chainer
 */
type NextChainer<I> = <O> (next: (input: I)=>O) => Chainer<O>

/**
 * Takes `value` and apply it to `next`. Use it's result to create a promise with.
 * @param next
 */
type NextPromise<I> = <O> (next: (input: I)=>Promise<O> | O) => Promise<O>

/**
 * Used to chain multiple function calls in a curry-like style.
 */
export type Chainer<I> = {
  next: NextChainer<I>
  then: NextPromise<I>

  /**
   * The current `value` of the chainer.
   */
  value: I
}

/**
 * Creates a chainer starting with `value`.
 * @param value The value which the chainer starts with.
 */
export function chainer<I>(value: I): Chainer<I> {
  return {
    next: next => chainer(next(value)),
    then: next => Promise.resolve(next(value)),
    value
  }
}
