/*
 * Copyright 2021 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

export type ArrayMapper<T, O> = (it: T, index: number, array: T[]) => O
export type ArrayPredicate<T> = ArrayMapper<T, boolean>
export type ArrayConsumer<T> = ArrayMapper<T, void>


// https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/-iterable/
// https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/-list/

export function subList<T>(array: T[], startIndex: number, endIndex: number): T[] {
  return array.slice(startIndex, endIndex)
}

export function all<T>(array: T[], predicate: ArrayPredicate<T>): boolean {
  return array.every(predicate)
}

export function any<T>(array: T[], predicate: ArrayPredicate<T>): boolean {
  return array.some(predicate)
}

export function associate<T, K, V>(array: T[], transform: ArrayMapper<T, [K, V]>): [K, V][] {
  return array.map(transform)
}

export function associateBy<T, K>(array: T[], keySelector: ArrayMapper<T, K>): [K, T][] {
  return array.map((it, index, array) => [keySelector(it, index, array), it])
}

export function associateByTransforming<T, K, V>(array: T[], keySelector: ArrayMapper<T, K>, valueTransform: ArrayMapper<T, V>): [K, V][] {
  return array.map((it, index, array) => [keySelector(it, index, array), valueTransform(it, index, array)])
}

export function associateWith<K, V>(array: K[], valueSelector: ArrayMapper<K, V>): [K, V][] {
  return array.map((it, index, array) => [it, valueSelector(it, index, array)])
}

export function average(array: number[]): number {
  return sum(array) / array.length
}

export function averageBy<T>(array: T[], selector: ArrayMapper<T, number>): number {
  return sumOf(array, selector) / array.length
}

// TODO transform
export function chunked<T>(array: T[], size: number) : T[][] {
  return array.reduce((buff, it, index) => {
    const chunkIndex = index % size
    const chunk = [ ...(buff[chunkIndex] ?? []), it ]
    return Object.assign(buff, { [chunkIndex]: chunk })
  }, [])
}

export function contains<T>(array: T[], element: T): boolean {
  return array.includes(element)
}

export function containsAll<T>(array: T[], elements: T[]): boolean {
  return all(array, it => elements.includes(it))
}


export function count<T>(array: T[], predicate: ArrayPredicate<T>): number {
  return array.reduce((sum, it, index, array) => predicate(it, index, array) ? sum + 1 : sum, 0)
}

export function distinct<T = number|string>(array: T[]): T[] {
  return [ ...new Set(array) ]
}

export function distinctWith<T>(array: T[], equals: (a: T, b: T) => boolean): T[] {
  return array.filter((a, index, array) =>  array.findIndex(b => equals(a, b)) === index)
}


export function distinctBy<T, K = number|string>(array: T[], transform: ArrayMapper<T, K>): T[] {
  return array.filter((it, index, array) => {
    const a = transform(it, index, array)
    return array.findIndex((it2, index2, array2) => transform(it2, index2, array2) === a) === index
  })
}

export function drop<T>(array: T[], n: number): T[] {
  return array.slice(n)
}

export function dropLast<T>(array: T[], n: number): T[] {
  return array.slice(0, -n)
}

export function dropWhile<T>(array: T[], predicate: ArrayPredicate<T>): T[] {
  let arr: T[] = []
  for (let i=0; i<array.length; i++) {
    const element = array[i]
    if (predicate(element, i, array)) {
      break
    } else {
      arr = [...arr, element]
    }
  }
  return arr
}

export function dropLastWhile<T>(array: T[], predicate: ArrayPredicate<T>): T[] {
  let arr: T[] = []
  for (let i=array.length-1; i>=0; i--) {
    const element = array[i]
    if (predicate(element, i, array)) {
      break
    } else {
      arr = [...arr, element]
    }
  }
  return arr
}

export function elementAtOrUndefined<T>(array: T[], index: number): T | undefined {
  return array[index]
}

export function elementAtOrElse<T>(array: T[], index: number, defaultValue: (index: number)=>T): T {
  return index < 0 || index >= array.length ? defaultValue(index) : array[index]
}

export function filterNot<T>(array: T[], predicate: ArrayPredicate<T>): T[] {
  return array.filter((it, index, arr) => !predicate(it, index, arr))
}

export function filterNotNullable<T>(array: Array<T | undefined | null>): T[] {
  return <T[]> array.filter(it => it != null)
}

export function findLast<T>(array: T[], predicate: ArrayPredicate<T>): T | undefined {
  for (let i = array.length-1; i>=0; i--) {
    const element = array[i]
    if (predicate(element, i, array)) {
      return element
    }
  }

  return undefined
}

export function firstOrNull<T>(array: T[], predicate: ArrayPredicate<T>): T | undefined {
  for (let i=0; i<array.length; i++) {
    const element = array[i]
    if (predicate(element, i, array)) {
      return element
    }
  }

  return undefined
}


export function firstNotNullableOf<T, R>(array: T[], transform: ArrayMapper<T, R | undefined | null>): R | undefined {
  for (let i=0; i<array.length; i++) {
    const element = transform(array[i], i, array)
    if (element != null) {
      return element
    }
  }

  return undefined
}

export function flatMap<T, R>(array: T[], transform: ArrayMapper<T, R[]>): R[] {
  return array.reduce((buff, it, index, array) => {
    return [ ...buff, ...transform(it, index, array) ]
  }, <R[]> [])
}

export function flatten<T>(array: T[][]): T[] {
  return array.reduce((buff, it) => [ ...buff, ...it ])
}

export function fold<T, R>(array: T[], initial: R, operation: (acc: R, it: T, index: number, array: T[])=>R) : R {
  return array.reduce(operation, initial)
}

export function foldRight<T, R>(array: T[], initial: R, operation: (acc: R, it: T, index: number, array: T[])=>R) : R {
  return array.reduceRight(operation, initial)
}

export function groupBy<T, V, K = number | string>(array: T[], keySelector: ArrayMapper<T, K>, valueTransform?: ArrayMapper<T, V>): [K, V[]][] {
  return array.reduce((acc, it, index, array) => {
    const key: K = keySelector(it, index, array)
    const value: V = valueTransform ? valueTransform(it, index, array) : <V> <unknown> it

    let groupIndex = acc.findIndex(it2 => it2.key === key)
    if (groupIndex === -1) {
      acc = [...acc, { key, values: [] }]
      groupIndex = acc.length - 1
    }

    return Object.assign(acc, {
      [groupIndex]: { key, values: [ ...acc[groupIndex].values, value ] }
    })

  }, <Array<{ key: K, values: Array<V[]> }>> [])
    .map(it => [it.key, flatten(it.values)])
}

export function indexOfFirst<T>(array: T[], predicate: ArrayPredicate<T>): number {
  for (let i=0; i<array.length; i++) {
    if (predicate(array[i], i, array)) {
      return i
    }
  }

  return -1
}

export function indexOfLast<T>(array: T[], predicate: ArrayPredicate<T>): number {
  for (let i = array.length-1; i>=0; i--) {
    if (predicate(array[i], i, array)) {
      return i
    }
  }

  return -1
}

export function intersect<T>(array: T[], other: T[]): T[] {
  return array.filter(it => other.includes(it))
}

export function intersectBy<T>(array: T[], other: T[], equals: (a: T, b: T) => boolean): T[] {
  return array.filter(a => other.some(b => equals(a, b)))
}

export function joinToString<T>(
  array: T[],
  separator: string = ", ",
  prefix: string = "",
  postfix: string = "",
  limit: number = -1,
  truncated: string = "...",
  transform: ArrayMapper<T, string>
) {
  if (array.length === 0) {
    return prefix + postfix
  }

  function buildString(): string {
    let stringBuilder = ""
    for (let i=0; i<array.length; i++) {
      if (limit > 0 && stringBuilder.length > limit) {
        return stringBuilder + truncated
      }

      const value = transform(array[i], i, array)
      stringBuilder += i === 0 ? value : separator + value
    }
    return stringBuilder
  }

  return prefix + buildString() + postfix
}

export function lastOrNull<T>(array: T[]): T | undefined {
  return array[array.length - 1]
}

export function mapNotNull<T, R>(array: T[], transform: ArrayMapper<T, R | undefined | null>): R[] {
  return <R[]> array.map(transform).filter(it => it != null)
}

export function maxOrNull(array: number[]): number | undefined {
  return array.length ? Math.max(...array) : undefined
}

// TODO in the default implementation, is it optimized with native code?
export function maxByOrNull<T>(array: T[], transform: ArrayMapper<T, number>): T | undefined {
  if (!array.length) {
    return undefined
  }

  let max = transform(array[0], 0, array)
  let elementIndex = 0
  for (let i=1; i < array.length; i++) {
    const value = transform(array[i], i, array)
    if (value > max) {
      max = value
      elementIndex = i
    }
  }

  return array[elementIndex]
}

export function maxOfOrNull<T>(array: T[], transform: ArrayMapper<T, number>): number | undefined {
  if (!array.length) {
    return undefined
  }

  let max = transform(array[0], 0, array)
  for (let i=1; i < array.length; i++) {
    const value = transform(array[i], i, array)
    if (value > max) {
      max = value
    }
  }

  return max
}

export function maxWithOrNull<T>(array: T[], comparator: (a: T, b: T) => number): T | undefined {
  if (!array.length) {
    return undefined
  }

  if (array.length === 1) {
    return array[0]
  }

  let max = array[0]
  for (let i=1; i < array.length; i++) {
    const value = array[i]
    if (comparator(max, value) > 0) {
      max = value
    }
  }

  return max
}

export function minOrNull(array: number[]): number | undefined {
  return array.length ? Math.min(...array) : undefined
}

// TODO in the default implementation, is it optimized with native code?
export function minByOrNull<T>(array: T[], transform: ArrayMapper<T, number>): T | undefined {
  if (!array.length) {
    return undefined
  }

  let min = transform(array[0], 0, array)
  let elementIndex = 0
  for (let i=1; i < array.length; i++) {
    const value = transform(array[i], i, array)
    if (value < min) {
      min = value
      elementIndex = i
    }
  }

  return array[elementIndex]
}

export function minOfOrNull<T>(array: T[], transform: ArrayMapper<T, number>): number | undefined {
  if (!array.length) {
    return undefined
  }

  let min = transform(array[0], 0, array)
  for (let i=1; i < array.length; i++) {
    const value = transform(array[i], i, array)
    if (value < min) {
      min = value
    }
  }

  return min
}

export function minWithOrNull<T>(array: T[], comparator: (a: T, b: T) => number): T | undefined {
  if (!array.length) {
    return undefined
  }

  if (array.length === 1) {
    return array[0]
  }

  let min = array[0]
  for (let i=1; i < array.length; i++) {
    const value = array[i]
    if (comparator(min, value) < 0) {
      min = value
    }
  }

  return min
}

export function minusElement<T>(array: T[], element: T): T[] {
  const firstIndex = array.indexOf(element)
  if (firstIndex !== -1) {
    array = [...array] // This function uses mutable functions, so make a copy of the array
    array.splice(firstIndex, 1)
    return array
  }

  return array
}

export function minusElements<T>(array: T[], element: T[]): T[] {
  return array.filter(it => !element.includes(it))
}

export function none<T>(array: T[], predicate: ArrayPredicate<T>): boolean {
  return !array.some(predicate)
}

export function onEach<T>(array: T[], action: ArrayConsumer<T>): T[] {
  array.forEach(action)
  return array
}

export function partition<T>(array: T[], predicate: ArrayPredicate<T>): [T[], T[]] {
  let t: T[] = []
  let f: T[] = []
  for (let i=0; i<array.length; i++) {
    const element = array[i]
    if (predicate(element, i, array)) {
      t = [...t, element]
    } else {
      f = [...f, element]
    }
  }

  return [t, f]
}

export function plusElement<T>(array: T[], element: T): T[] {
  return [...array, element]
}

export function plusElements<T>(array: T[], elements: T[]): T[] {
  return [...array, ...elements]
}

export function reduceOrNull<S, T extends S>(array: T[], operation: (acc: S, it: T, index: number, array: T[])=>S) : S | undefined {
  if (array.length === 0) {
    return undefined
  }

  let acc: S = array[0]
  for (let i=1; i<array.length; i++) {
    acc = operation(acc, array[i], i, array)
  }

  return acc
}

export function scan<T, R>(
  array: T[],
  initial: R,
  operation: (acc: R, it: T, index: number, array: T[])=>R): R[]
{
  let result: R[] = []
  let acc = initial

  for (let i=0; i<array.length; i++) {
    result = [...result, acc = operation(acc, array[i], i, array)]
  }

  return result
}

export function scanRight<T, R>(
  array: T[],
  initial: R,
  operation: (acc: R, it: T, index: number, array: T[])=>R): R[]
{
  let result: R[] = []
  let acc = initial

  for (let i=array.length-1; i>=0; i--) {
    result = [...result, acc = operation(acc, array[i], i, array)]
  }

  return result
}

export function shuffled<T>(array: T[], random: ()=>number = Math.random): T[] {
  return array.sort(() => random() - .5)
}

export function sortedBy<T>(array: T[], selector: (it: T)=>number): T[] {
  return array.sort((a, b) => selector(a) - selector(b))
}

export function sortedByDescending<T>(array: T[], selector: (it: T)=>number): T[] {
  return sortedBy(array, selector).reverse()
}

export function sum(array: number[]): number {
  return array.reduce((a, b) => a + b, 0)
}

export function sumOf<T>(array: T[], selector: ArrayMapper<T, number>): number {
  return sum(array.map(selector))
}

export function take<T>(array: T[], n: number): T[] {
  return array.slice(0, n)
}

export function takeWhile<T>(array: T[], predicate: ArrayPredicate<T>): T[] {
  let arr: T[] = []
  for (let i=0; i<array.length; i++) {
    const element = array[i]
    if (predicate(element, i, array)) {
      arr = [...arr, element]
    } else {
      break
    }
  }
  return arr
}

export function takeLast<T>(array: T[], n: number): T[] {
  return array.slice(array.length-n)
}

export function takeLastWhile<T>(array: T[], predicate: ArrayPredicate<T>): T[] {
  let arr: T[] = []
  for (let i=array.length-1; i>=0; i--) {
    const element = array[i]
    if (predicate(element, i, array)) {
      arr = [...arr, element]
    } else {
      break
    }
  }
  return arr
}

export function toSet<T>(array: T[]): Set<T> {
  return new Set(array)
}

export function union<T = number | string>(array: T[], other: T[]): T[] {
  return distinct(array.filter(it => other.includes(it)))
}

export function unionWith<T>(array: T[], other: T[], equals: (a: T, b: T)=>boolean): T[] {
  return distinctWith(array.filter(a => any(other, b => equals(a, b))), equals)
}

export function unionBy<T>(array: T[], other: T[], transform: ArrayMapper<T, number | string>): T[] {
  return distinctBy(array.filter((a, aIndex) => {
    const aTransform = transform(a, aIndex, array)
    return any(other, (b, bIndex) => transform(b, bIndex, other) === aTransform)
  }), transform)
}

export function zip<T, R>(array: T[], other: R[]): [T, R][] {
  const to = Math.min(array.length, other.length)
  let result: [T, R][] = []
  for (let i=0; i<to; i++) {
    result = plusElement(result, [array[i], other[i]])
  }
  return result
}

export function zipWith<T, R>(array: T[], other: T[], transform: (a: T, b: T)=>R): R[] {
  const to = Math.min(array.length, other.length)
  let result: R[] = []
  for (let i=0; i<to; i++) {
    result = plusElement(result, transform(array[i], other[i]))
  }
  return result
}

export function zipWithNext<T, R>(array: T[], transform: (a: T, b: T)=>R): R[] {
  return dropLast(array, 1).map((it, index) => transform(it, array[index+1]))
}

export function unzip<T, R>(array: [T, R][]): [T[], R[]] {
  const result = array.reduce((acc, [a, b]) => {
    return {
      a: <T[]> plusElement(acc.a, a),
      b: <R[]> plusElement(acc.b, b)
    }
  }, <{ a: T[], b: R[] }> { a: [], b: [] })

  return [result.a, result.b]
}
