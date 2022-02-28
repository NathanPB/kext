/*
 * Copyright 2022 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// https://www.reddit.com/r/typescript/comments/t25op5/is_there_any_way_that_i_could_maintain_the_name
// https://www.reddit.com/r/typescript/comments/t25op5/comment/hyks5a2
// https://www.reddit.com/r/typescript/comments/t25op5/comment/hyooxx2

export type FirstParam2<T extends any[]>  = T extends [...infer P, unknown] ? [...P] : never;
export type SecondParam2<T extends any[]> = T extends [unknown, ...infer P] ? [...P] : never;

export type FirstParam3<T extends any[]>  = T extends [...infer P, unknown, unknown] ? [...P] : never;
export type SecondParam3<T extends any[]> = T extends [unknown, ...infer P, unknown] ? [...P] : never;
export type ThirdParam3<T extends any[]>  = T extends [unknown, unknown, ...infer P] ? [...P] : never;

export type FirstParam4<T extends any[]>  = T extends [...infer P, unknown, unknown, unknown] ? [...P] : never;
export type SecondParam4<T extends any[]> = T extends [unknown, ...infer P, unknown, unknown] ? [...P] : never;
export type ThirdParam4<T extends any[]>  = T extends [unknown, unknown, ...infer P, unknown] ? [...P] : never;
export type FourthParam4<T extends any[]> = T extends [unknown, unknown, unknown, ...infer P] ? [...P] : never;

type PopParams<F> = F extends (arg0: any, ...rest: infer R) => any ? R : never

function withBase<T, F>(newFunction: T, baseFunction: F) {
  Object.assign(newFunction, { kext$baseFunction: baseFunction })
  return newFunction
}

/**
 * Curry a function with two parameters
 * @param func Function to be curried
 */
export function curry2<
  F extends (a: any, b: any) => any,
  R = ReturnType<F>
>(func: F): (...b: SecondParam2<Parameters<F>>) => (...a: FirstParam2<Parameters<F>>) => R {
  return withBase(b => a => func(a, b), func)
}

/**
 * Curry a function with three parameters
 * @param func Function to be curried
 */
export function curry3<
  F extends (a: any, b: any, c: any) => any,
  R = ReturnType<F>,
>(func: F): (...c: ThirdParam3<Parameters<F>>) => (...b: SecondParam3<Parameters<F>>) => (...a: FirstParam3<Parameters<F>>) => R {
  return withBase(c => b => a => func(a, b, c), func)
}

/**
 * Curry a function with four parameters
 * @param func Function to be curried
 */
export function curry4<
  F extends (a: any, b: any, c: any, d: any) => any,
  R = ReturnType<F>
>(func: F): (...d: FourthParam4<Parameters<F>>) => (...c: ThirdParam4<Parameters<F>>) => (...b: SecondParam4<Parameters<F>>) => (...a: FirstParam4<Parameters<F>>) => R {
  return withBase(d => c => b => a => func(a, b, c, d), func)
}

export function curryFirst3<
  F extends (a: any, b: any, c: any) => any,
  R = ReturnType<F>
>(func: F): (...params: PopParams<Parameters<F>>) => (...a: FirstParam3<Parameters<F>>) => R {
  /* @ts-ignore */
  return withBase((b, c) => a => func(a, b, c), func)
}

export function curryFirst4<
  F extends (a: any, b: any, c: any, d: any) => any,
  R = ReturnType<F>
>(func: F): (...params: PopParams<Parameters<F>>) => (...a: FirstParam3<Parameters<F>>) => R {
  /* @ts-ignore */
  return withBase((b, c, d) => a => func(a, b, c, d), func)
}

/**
 * Flips the parameters of a function with two arguments.
 * @param func The function whose parameters are to be flipped.
 */
export function flip2<R, A, B>(func: (a: A, b: B)=>R) {
  return withBase((b: B, a: A) => func(a, b), func)
}

/**
 * Flips the parameters of a function with three arguments.
 * @param func The function whose parameters are to be flipped.
 */
export function flip3<R, A, B, C>(func: (a: A, b: B, c: C)=>R) {
  return withBase((c: C, b: B, a: A) => func(a, b, c), func)
}

/**
 * Flips the parameters of a function with four arguments.
 * @param func The function whose parameters are to be flipped.
 */
export function flip4<R, A, B, C, D>(func: (a: A, b: B, c: C, d: D)=>R) {
  return withBase((d: D, c: C, b: B, a: A) => func(a, b, c, d), func)
}

/**
 * Flips the first with the second parameters of a function with two arguments.
 * @param func The function whose parameters are to be flipped.
 */
export function flipSecond2<R, A, B>(func: (a: A, b: B)=>R) {
  return withBase((b: B, a: A) => func(a, b), func)
}

/**
 * Flips the first with the second parameters of a function with three arguments.
 * @param func The function whose parameters are to be flipped.
 */
export function flipSecond3<R, A, B, C>(func: (a: A, b: B, c: C)=>R) {
  return withBase((b: B, a: A, c: C) => func(a, b, c), func)
}

/**
 * Flips the first with the second parameters of a function with four arguments.
 * @param func The function whose parameters are to be flipped.
 */
export function flipSecond4<R, A, B, C, D>(func: (a: A, b: B, c: C, d: D)=>R) {
  return withBase((b: B, a: A, c: C, d: D) => func(a, b, c, d), func)
}

/**
 * Flips the first with the third parameters of a function with three arguments.
 * @param func The function whose parameters are to be flipped.
 */
export function flipThird3<R, A, B, C>(func: (a: A, b: B, c: C)=>R) {
  return withBase((c: C, a: A, b: B) => func(a, b, c), func)
}

/**
 * Flips the first with the third parameters of a function with four arguments.
 * @param func The function whose parameters are to be flipped.
 */
export function flipThird4<R, A, B, C, D>(func: (a: A, b: B, c: C, d: D)=>R) {
  return withBase((c: C, a: A, b: B, d: D) => func(a, b, c, d), func)
}

/**
 * Flips the first with the fourth parameters of a function with four arguments.
 * @param func The function whose parameters are to be flipped.
 */
export function flipFourth4<R, A, B, C, D>(func: (a: A, b: B, c: C, d: D)=>R) {
  return withBase((d: D, a: A, b: B, c: C) => func(a, b, c, d), func)
}
