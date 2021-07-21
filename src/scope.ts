/*
 * Copyright 2021 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// https://kotlinlang.org/docs/scope-functions.html
// let, with, run, apply an also are preceded by an underscore due JS's strict mode.

/**
 * Calls the specified `block` with it's argument as `receiver`. Returns its result.
 *
 * https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/let.html
 *
 * @returns The evaluation of `block`.
 */
export function _let<I, O>(receiver: I, block: (it: I)=>O): O {
  return block(receiver)
}

/**
 * Calls the specified `block` with it's `this` argument as `receiver`. Returns its result.
 *
 * https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/with.html
 *
 * @returns The evaluation of `block`.
 */
export function _with<I, O>(receiver: I, block: (this: I)=>O): O {
  return block.call(receiver)
}

/**
 * Calls the specified `block` maintaining the `this` value. Returns its result.
 *
 * https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/run.html
 *
 * @returns The evaluation of `block`.
 */
export function _run<I, O>(this: I, block: (this: I)=>O): O {
  return block.call(this)
}

/**
 * Calls the specified `block` with `receiver` as its `this` argument. Returns `receiver` value.
 *
 * https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/apply.html
 *
 * @returns The value of `receiver`.
 */
export function _apply<T>(receiver: T, block: (this: T)=>void): T {
  block.call(receiver)
  return receiver
}

/**
 * Calls the specified `block` with `receiver` as its argument. Returns `receiver` value.
 *
 * https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/also.html
 *
 * @returns The value of `receiver`.
 */
export function _also<T>(receiver: T, block: (it: T)=>void): T {
  block(receiver)
  return receiver
}

/**
 * Returns `receiver` value if it satisfies the given `predicate` or `undefined`, if it doesn't.
 *
 * https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/take-if.html
 *
 * @returns `receiver` if the evaluation of `predicate` is `true`. `undefined` otherwise.
 */
export function takeIf<T>(receiver: T, predicate: (it: T)=>boolean) : T | undefined {
  return predicate(receiver) ? receiver : undefined
}

/**
 * Returns `receiver` value if it does not satisfy the given `predicate` or `undefined`, if it does.
 *
 * https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/take-unless.html
 *
 * @returns `receiver` if the evaluation of `predicate` is `false`. `undefined` otherwise.
 */
export function takeUnless<T>(receiver: T, predicate: (it: T)=>boolean) : T | undefined {
  return predicate(receiver) ? undefined : receiver
}

/**
 * Calls the specified `block` and returns its result.
 *
 * @returns The evaluation result of `block`.
 */
export function run<T>(block: ()=>T): T {
  return block()
}
