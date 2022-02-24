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
 * Async version of {@link Chainer}.
 * Used to chain multiple function calls in a curry-like style.
 */
export type AsyncChainer<I> = {
  /**
   * Takes `value` and apply it to `next`. Use it's result to create a new async chainer.
   * @param next
   */
  nextAsync: <O> (next: (input: Promise<I> | I)=>Promise<O> | O) => AsyncChainer<O>

  /**
   * The current `value` of the chainer.
   */
  value: Promise<I>
}

/**
 * Used to chain multiple function calls in a curry-like style.
 */
export type Chainer<I> = {
  /**
   * Takes `value` and apply it to `next`. Use it's result to create a new chainer.
   * @param next
   * @see chainer
   */
  next: <O> (next: (input: I)=>O) => Chainer<O>

  /**
   * Takes `value` and apply it to `next`. Use it's result to create a new async chainer.
   * @param next
   * @see aChainer
   */
  nextAsync: <O> (next: (input: Promise<I> | I)=>Promise<O> | O) => AsyncChainer<O>

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
    nextAsync: next => aChainer(Promise.resolve(next(value))),
    value
  }
}

/**
 * Creates an async chainer starting with `value`.
 * @param value The value which the chainer starts with.
 */
export function aChainer<I>(value: Promise<I>): AsyncChainer<I> {
  return {
    nextAsync: next => aChainer(Promise.resolve(next(value))),
    value
  }
}
