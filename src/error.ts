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
 * Wraps the evaluation of an operation, which could either succeed with (or without) a result or fail with (or without) an error.
 *
 * This class is always an immutable data structure.
 *
 * @see https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-result/
 */
export class Result<T, E> {
  readonly result?: T
  readonly error?: E

  /**
   * True if the Result represents success.
   *
   * Will always be opposite to `isFailure`.
   *
   * @see https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-result/is-failure.html
   */
  readonly isSuccess: boolean

  /**
   * True if the Result represents a failure.
   *
   * Will always be opposite to `isSuccess`.
   *
   * @see https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-result/is-failure.html
   */
  readonly isFailure: boolean

  private constructor(result: T | undefined, error: E | undefined, isSuccess: boolean) {
    this.result = result
    this.error = error
    this.isSuccess = isSuccess
    this.isFailure = !isSuccess
    Object.freeze(this)
  }

  /**
   * Creates a failed `Result` with the given error.
   *
   * @see https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-result/failure.html
   * @param error The error to use in the `Result`.
   */
  static failure<E, T = never>(error: E) {
    return new Result<T, E>(undefined, error, false)
  }

  /**
   * Creates a succeeded `Result` with the given value.
   *
   * @see https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-result/failure.html
   * @param value The value to use in the `Result`.
   */
  static success<T, E = never>(value: T) {
    return new Result<T, E>(value, undefined, true)
  }

  /**
   * Returns the `Result`'s error if the failed, or `undefined` if it succeeded.
   *
   * @see https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-result/exception-or-null.html
   */
  public errorOrUndefined(): E | undefined {
    return this.isSuccess ? undefined : this.error
  }

  /**
   * Returns the `Result`'s value if it succeeded, or `undefined` if it failed.
   *
   * @see https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-result/get-or-null.html
   */
  getOrUndefined(): T | undefined {
    return this.isSuccess ? this.result : undefined
  }

  /**
   * Returns the `Result`'s value if it succeeded, or the passed value if it failed.
   *
   * @see https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/get-or-default.html
   * @param defaultValue The value to return in case the `Result` represents a failure.
   */
  getOrDefault<R>(defaultValue: R): T | R {
    return this.isSuccess ? this.result!! : defaultValue
  }

  /**
   * Returns the `Result`'s value if it succeeded.
   * If the result represents a failure, evaluates `onFailure` with the occurred error as parameter and returns the result of the evaluation.
   *
   * @see https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/get-or-else.html
   * @param onFailure
   */
  getOrElse<R>(onFailure: (e: E)=>R): T | R {
    return this.isSuccess ? this.result!! : onFailure(this.error!!)
  }

  /**
   * Returns the `Result`'s value if it succeeded, or throw the `Result`'s error if it failed.
   *
   * @see https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/get-or-throw.html
   */
  getOrThrow(): T {
    if (this.isSuccess) return this.result!!
    throw this.error!!
  }

  /**
   * Map's the current `Result` using `onSuccess` or `onFailure`. Returns the result of the evaluation.
   *
   * The function passed on `onSuccess` is used is used to map the current `Result` if it represents a success. If so, the current value is used as the `value` parameter.
   *
   * The function passed on `onFailure` is used is used to map the current `Result` if it represents a failure. If so, the current error is used as the `error` parameter.
   *
   * @see https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/fold.html
   * @param args
   */
  fold<R>(args: { onSuccess: (value: T) => R, onFailure: (error: E) => R }): R {
    return this.isSuccess
      ? args.onSuccess(this.result!!)
      : args.onFailure(this.error!!)
  }

  /**
   * Transforms the value of the `Result` if it represents a success. If not, returns the current result.
   *
   * The function on `transform` is used to transform the value in case the result represents success. If so, the `value` argument of this callback function will be the current value of the `Result`.
   * This operation does not mutate the current `Result`, instead returns a new one with the return of `value` wrapped.
   *
   * If the current `Result` represents an error, the current result is returned unchanged.
   *
   * If the evaluation of the `transform` function fails, the error will be left uncatched.
   *
   * @see https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/map.html
   * @param transform The callback to be used to transform the current result.
   */
  map<R>(transform: (value: T)=>R): Result<R, E> | Result<T, E> {
    return this.isSuccess
      ? Result.success(transform(this.result!!))
      : this
  }

  /**
   * Transforms the error of the `Result` if it represents a failure. If not, returns the current result.
   *
   * The function on `transform` is used to transform the value in case the result represents success. If so, the `error` argument of this callback function will be the current error of the `Result`.
   * This operation does not mutate the current `Result`, instead returns a new one with the return of `value` wrapped as error.
   *
   * If the current `Result` represents a success, the current result is returned unchanged.
   *
   * If the evaluation of the `transform` function fails, the error will be left uncatched.
   *
   * @param transform The callback to be used to transform the current error.
   */
  mapError<RE>(transform: (error: E)=>RE): Result<T, RE> | Result<T, E> {
    return this.error
      ? Result.failure(transform(this.error!!))
      : this
  }

  /**
   * Transforms the value of the `Result` if it represents a failure. If not, returns the current result.
   *
   * The function on `transform` is used to transform the value in case the result represents success. If so, the `value` argument of this callback function will be the current value of the `Result`.
   * This operation does not mutate the current `Result`, instead returns a new one with the return of `value` wrapped.
   *
   * If the current result represents an error, the current result is returned unchanged.
   *
   * If the evaluation of the `transform` function fails, the `Result` returned will be a failure with the exception as it's wrapped error.
   *
   * @see https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/map-catching.html
   * @param transform The callback to be used to transform the current result.
   */
  mapCatching<R>(transform: (value: T)=>R): Result<R, E> | Result<T, E> {
    return this.isSuccess
      ? runCatching(() => transform(this.result!!))
      : this
  }

  /**
   * Executes the callback in the `action` parameter if the current result represents a failure. Always returns the current error unchanged, regardless of the result of the `action` callback.
   *
   * The `error` parameter of the callback `action` is the error that the current `Result` is wrapping.
   *
   * @see https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/on-failure.html
   * @param action The callback to be executed case the current `Result` represents a failure.
   */
  onFailure(action: (error: E)=>void): Result<T, E> {
    if (this.isFailure) action(this.error!!)
    return this
  }

  /**
   * Executes the callback in the `action` parameter if the current result represents a succeeded. Always returns the current error unchanged, regardless of the result of the `action` callback.
   *
   * The `value` parameter of the callback `action` is the value that the current `Result` is wrapping.
   *
   * @see https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/on-success.html
   * @param action The callback to be executed case the current `Result` represents a succeeded operation.
   */
  onSuccess(action: (value: T)=>void): Result<T, E> {
    if (this.isSuccess) action(this.result!!)
    return this
  }

  /**
   * Executes the callback `transform` if the current `Result` represents a failure and returns it result. Returns the current unchanged `Result` if it represents a success.
   *
   * The `error` parameter of the `transform` callback is the error that the current `Result` is wrapping.
   *
   * This function does not catches any errors thrown in the `transform` callback.
   *
   * @see https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/recover.html
   * @param transform
   */
  recover<R, NE = E>(transform: (error: E)=>R): Result<R, NE> | Result<T, E> {
    return this.isSuccess ? this : Result.success<R, NE>(transform(this.error!!))
  }

  /**
   * Executes the callback `transform` if the current `Result` represents a failure and returns it result. Returns the current unchanged `Result` if it represents a success.
   *
   * The `error` parameter of the `transform` callback is the error that the current `Result` is wrapping.
   *
   * This function catches any errors thrown in the `transform` callback, and if there are any, the returned `Results` will be a failure with the error that was thrown wrapped in it.
   *
   * @see https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/recover-catching.html
   * @param transform
   */
  recoverCatching<R, NE = E>(transform: (e: E)=>R): Result<R, NE> | Result<T, E> {
    return this.isSuccess ? this : runCatching<R, NE>(() => transform(this.error!!))
  }
}

/**
 * Throws the error passes on `error`.
 *
 * The purpose of this is that it can be used as an expression.
 *
 * @param error The error to throw.
 */
export function throwExpr(error: any): never {
  throw error
}

/**
 * Evaluates the code block on `block`, returns a `Result` representing the result of the evaluation.
 *
 * @see https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/run-catching.html
 * @param block The code block to evaluate.
 */
export function runCatching<T, E = any>(block: ()=>T): Result<T, E> {
  try {
    return Result.success<T, E>(block())
  } catch (e: any) {
    return Result.failure<E, T>(e)
  }
}

/**
 * Asynchronously evaluates the code block on `block`, returns a `Result` representing the result of the evaluated promise..
 *
 * @see https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/run-catching.html
 * @param block The code block to evaluate.
 */
export async function runCatching$<T, E = any>(block: ()=>Promise<T>): Promise<Result<T, E>> {
  try {
    return Result.success<T, E>(await block())
  } catch (e: any) {
    return Result.failure<E, T>(e)
  }
}
