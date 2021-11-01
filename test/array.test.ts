// @ts-ignore
import {multiImpTest} from "./helper";

import * as AJS from '../src/lib/js/array'
import * as ANative from '../src/lib/native/array'

test('all', () => {
  expect(AJS.all([-2, -1, 0, 1, 2], it => it > 0)).toBeFalsy()
  expect(AJS.all([0, 1, 2], it => it > 0)).toBeFalsy()
  expect(AJS.all([1, 2], it => it > 0)).toBeTruthy()
})

describe('indexOfFirst', () => {
  multiImpTest({ js: AJS.indexOfFirst, native: ANative.indexOfFirst }, { test }).forEach(([indexOfFirst , { test }]) => {
    const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 90]
    test('return', () => {
      expect(indexOfFirst(data, it => it === 0)).toEqual(0)
      expect(indexOfFirst(data, it => it === 90)).toEqual(10)
      expect(indexOfFirst(data, it => it === 99)).toEqual(-1)
    })

    test('callback params', () => {
      const fnWorst = jest.fn(() => false)
      indexOfFirst(data, fnWorst)

      expect(fnWorst).toHaveBeenCalledTimes(11)
      expect(fnWorst).toHaveBeenNthCalledWith(1, 0, 0, data)
      expect(fnWorst).toHaveBeenNthCalledWith(11, 90, 10, data)

      const fnBest = jest.fn(() => true)
      indexOfFirst(data, fnBest)
      expect(fnBest).toHaveBeenCalledTimes(1)
      expect(fnBest).toHaveBeenNthCalledWith(1, 0, 0, data)
    })
  })
})


test('any', () => {
  expect(AJS.any([-2, -1, 0, 1, 2], it => it > 0)).toBeTruthy()
  expect(AJS.any([0, 1, 2], it => it > 0)).toBeTruthy()
  expect(AJS.any([1, 2], it => it > 0)).toBeTruthy()
  expect(AJS.any([-2, -1], it => it > 0)).toBeFalsy()
})


test('contains', () => {
  expect(AJS.contains([0, 1, 2], 1)).toBeTruthy()
  expect(AJS.contains([0, 1, 2], 4)).toBeFalsy()
})

test('containsAll', () => {
  expect(AJS.containsAll([0, 1, 2], [1])).toBeTruthy()
  expect(AJS.containsAll([0, 1, 2], [4])).toBeFalsy()

  expect(AJS.containsAll([0, 1, 2], [1, 2])).toBeTruthy()
  expect(AJS.containsAll([0, 1, 2], [1, 4])).toBeFalsy()

  expect(AJS.containsAll([0, 1, 2], [])).toBeTruthy()
})

test('firstOrNullBy', () => {
  const sample = [
    { id: 'A', name: 'Joan' },
    { id: 'B', name: 'Nathan' },
    { id: 'C', name: 'Marcus' },
    { id: 'D', name: 'Cris' },
    { id: 'E', name: 'Nathan' }
  ]

  expect(AJS.firstOrNullBy(sample, 'Nathan', it => it.name)).toEqual({ id: 'B', name: 'Nathan' })
  expect(AJS.firstOrNullBy(sample, 'Pedro', it => it.name)).toEqual(undefined)
})

test('firstOrNullByTransforming', () => {
  const sample = [
    { id: 'A', name: 'Joan' },
    { id: 'B', name: 'Nathan' },
    { id: 'C', name: 'Marcus' },
    { id: 'D', name: 'Cris' },
    { id: 'E', name: 'Nathan' }
  ]

  expect(AJS.firstOrNullByTransforming(sample, 'Nathan', it => it.name, it => it.id)).toStrictEqual('B')
  expect(AJS.firstOrNullByTransforming(sample, 'Pedro', it => it.name, it => it.id)).toEqual(undefined)
})

test('lastOrNullBy', () => {
  const sample = [
    { id: 'A', name: 'Joan' },
    { id: 'B', name: 'Nathan' },
    { id: 'C', name: 'Marcus' },
    { id: 'D', name: 'Cris' },
    { id: 'E', name: 'Nathan' }
  ]

  expect(AJS.lastOrNullBy(sample, 'Nathan', it => it.name)).toEqual({ id: 'E', name: 'Nathan' })
  expect(AJS.lastOrNullBy(sample, 'Pedro', it => it.name)).toEqual(undefined)
})

test('firstOrNullByTransforming', () => {
  const sample = [
    { id: 'A', name: 'Joan' },
    { id: 'B', name: 'Nathan' },
    { id: 'C', name: 'Marcus' },
    { id: 'D', name: 'Cris' },
    { id: 'E', name: 'Nathan' }
  ]

  expect(AJS.lastOrNullByTransforming(sample, 'Nathan', it => it.name, it => it.id)).toStrictEqual('E')
  expect(AJS.lastOrNullByTransforming(sample, 'Pedro', it => it.name, it => it.id)).toEqual(undefined)
})

test('subList', () => {
  const list = [0, 1, 2, 3]
  expect(AJS.subList(list, 0, 99)).toStrictEqual([0, 1, 2, 3])
  expect(AJS.subList(list, 0, 4)).toStrictEqual([0, 1, 2, 3])
  expect(AJS.subList(list, 1, 4)).toStrictEqual([1, 2, 3])
  expect(AJS.subList(list, 3, 4)).toStrictEqual([3])
  expect(AJS.subList(list, 3, 3)).toStrictEqual([])
  expect(AJS.subList(list, 0, 0)).toStrictEqual([])
  expect(AJS.subList(list, 0, -1)).toStrictEqual([0, 1, 2])
  expect(AJS.subList([], 90, 99)).toStrictEqual([])
})

test('associate', () => {
  expect(AJS.associate([0, 1, 2, 3], (it, index) => [it * 100, index]))
    .toStrictEqual([
      [0, 0],
      [100, 1],
      [200, 2],
      [300, 3]
    ])
})

test('associateBy', () => {
  expect(AJS.associateBy([0, 1, 2, 3], it => it * 100))
    .toStrictEqual([
      [0, 0],
      [100, 1],
      [200, 2],
      [300, 3]
    ])
})

test('associateByTransforming', () => {
  expect(
    AJS.associateByTransforming([0, 1, 2, 3], it => it * 100, it => it * 1000))
    .toStrictEqual([
      [0, 0],
      [100, 1000],
      [200, 2000],
      [300, 3000]
    ])
})


test('associateWith', () => {
  expect(AJS.associateWith([0, 1, 2, 3], it => it * 100))
    .toStrictEqual([
      [0, 0],
      [1, 100],
      [2, 200],
      [3, 300]
    ])
})

test('average', () => {
  expect(AJS.average([0, 0, 5, 5])).toEqual(2.5)
  expect(AJS.average([0, 0, 0, 5])).toEqual(1.25)
  expect(AJS.average([0, 0, 0, 0])).toEqual(0)
  expect(AJS.average([])).toEqual(NaN)
})


test('averageBy', () => {
  expect(AJS.averageBy([0, 0, 5, 5], it => it * 100)).toEqual(250)
  expect(AJS.averageBy([0, 0, 0, 5], it => it * 100)).toEqual(125)
  expect(AJS.averageBy([0, 0, 0, 0], it => it * 100)).toEqual(0)
  expect(AJS.averageBy([], it => it * 100)).toEqual(NaN)
})

test('chunkedByCount', () => {
  expect(AJS.chunkedByCount([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 2)).toStrictEqual([
    [0, 2, 4, 6, 8],
    [1, 3, 5, 7, 9],
  ])
})

test('chunkedBySize', () => {
  expect(AJS.chunkedBySize([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5)).toStrictEqual([
    [0, 2, 4, 6, 8],
    [1, 3, 5, 7, 9],
  ])
})

test('count', () => {
  expect(AJS.count([])).toEqual(0)
  expect(AJS.count([1, 2, 3])).toEqual(3)

  expect(AJS.count([], it => it % 2 === 0)).toEqual(0)
  expect(AJS.count([0, 1, 2, 3, 4], it => it % 2 === 0)).toEqual(3)
})

test('distinct', () => {
  expect(AJS.distinct([0, 1, 0, 2, 3, 1])).toStrictEqual([0, 1, 2, 3])
  expect(AJS.distinct([0, 1, 2, 3])).toStrictEqual([0, 1, 2, 3])
  expect(AJS.distinct([0, 1, 3, 2])).toStrictEqual([0, 1, 3, 2])
  expect(AJS.distinct([0, 0, 0 ,0])).toStrictEqual([0])
  expect(AJS.distinct([])).toStrictEqual([])
})


test('distinctWith', () => {
  const comp = (a: { age: number }, b: { age: number }) => a.age === b.age

  expect(
    AJS.distinctWith(
      [ { age: 0 }, { age: 1 }, { age: 0 }, { age: 2 }, { age: 3 }, { age: 1 } ], comp
    )
  ).toStrictEqual([{ age: 0 }, { age: 1 }, { age: 2 }, { age: 3 }])

  expect(
    AJS.distinctWith([{ age: 0 }, { age: 1 }, { age: 2 }, { age: 3 }], comp)
  ).toStrictEqual([{ age: 0 }, { age: 1 }, { age: 2 }, { age: 3 }])

  expect(
    AJS.distinctWith([{ age: 0 }, { age: 1 }, { age: 3 }, { age: 2 }], comp)
  ).toStrictEqual([{ age: 0 }, { age: 1 }, { age: 3 }, { age: 2 }])

  expect(
    AJS.distinctWith([{ age: 0 }, { age: 0 }, { age: 0 }, { age: 0 }], comp)
  ).toStrictEqual([{ age: 0 }])

  expect(AJS.distinctWith([], comp)).toStrictEqual([])
})

test('distinctBy', () => {

  expect(
    AJS.distinctBy(
      [ { age: 0 }, { age: 1 }, { age: 0 }, { age: 2 }, { age: 3 }, { age: 1 } ], it => it.age
    )
  ).toStrictEqual([{ age: 0 }, { age: 1 }, { age: 2 }, { age: 3 }])

  expect(
    AJS.distinctBy([{ age: 0 }, { age: 1 }, { age: 2 }, { age: 3 }], it => it.age)
  ).toStrictEqual([{ age: 0 }, { age: 1 }, { age: 2 }, { age: 3 }])

  expect(
    AJS.distinctBy([{ age: 0 }, { age: 1 }, { age: 3 }, { age: 2 }], it => it.age)
  ).toStrictEqual([{ age: 0 }, { age: 1 }, { age: 3 }, { age: 2 }])

  expect(
    AJS.distinctBy([{ age: 0 }, { age: 0 }, { age: 0 }, { age: 0 }], it => it.age)
  ).toStrictEqual([{ age: 0 }])

  expect(AJS.distinctBy(<{ age: number }[]>[], it => it.age)).toStrictEqual([])
})
