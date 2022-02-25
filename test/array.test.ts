import * as A from '../src/array'

describe('existential', () => {
  test('#all', () => {
    expect(A.all([-2, -1, 0, 1, 2], it => it > 0)).toBeFalsy()
    expect(A.all([0, 1, 2], it => it > 0)).toBeFalsy()
    expect(A.all([1, 2], it => it > 0)).toBeTruthy()
  })

  test('#any', () => {
    expect(A.any([-2, -1, 0, 1, 2], it => it > 0)).toBeTruthy()
    expect(A.any([0, 1, 2], it => it > 0)).toBeTruthy()
    expect(A.any([1, 2], it => it > 0)).toBeTruthy()
    expect(A.any([-2, -1], it => it > 0)).toBeFalsy()
  })

  test('#none', () => {
    expect(A.none([0, 1, 2], it => it === 3)).toBeTruthy()
    expect(A.none([0, 1, 2], it => it === 1)).toBeFalsy()
  })

  test('#contains', () => {
    expect(A.contains([0, 1, 2], 1)).toBeTruthy()
    expect(A.contains([0, 1, 2], 4)).toBeFalsy()
  })

  test('#containsAll', () => {
    expect(A.containsAll([0, 1, 2], [1])).toBeTruthy()
    expect(A.containsAll([0, 1, 2], [4])).toBeFalsy()

    expect(A.containsAll([0, 1, 2], [1, 2])).toBeTruthy()
    expect(A.containsAll([0, 1, 2], [1, 4])).toBeFalsy()

    expect(A.containsAll([0, 1, 2], [])).toBeTruthy()
  })
})

describe('findIndexOfFirst', () => {
  const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 90]
  test('return', () => {
    expect(A.findIndexOfFirst(data, it => it === 0)).toEqual(0)
    expect(A.findIndexOfFirst(data, it => it === 90)).toEqual(10)
    expect(A.findIndexOfFirst(data, it => it === 99)).toEqual(-1)
  })

  test('callback params', () => {
    const fnWorst = jest.fn(() => false)
    A.findIndexOfFirst(data, fnWorst)

    expect(fnWorst).toHaveBeenCalledTimes(11)
    expect(fnWorst).toHaveBeenNthCalledWith(1, 0, 0, data)
    expect(fnWorst).toHaveBeenNthCalledWith(11, 90, 10, data)

    const fnBest = jest.fn(() => true)
    A.findIndexOfFirst(data, fnBest)
    expect(fnBest).toHaveBeenCalledTimes(1)
    expect(fnBest).toHaveBeenNthCalledWith(1, 0, 0, data)
  })
})

test('firstOrNullBy', () => {
  const sample = [
    { id: 'A', name: 'Joan' },
    { id: 'B', name: 'Nathan' },
    { id: 'C', name: 'Marcus' },
    { id: 'D', name: 'Cris' },
    { id: 'E', name: 'Nathan' }
  ]

  expect(A.findFirstOrNullBy(sample, 'Nathan', it => it.name)).toEqual({ id: 'B', name: 'Nathan' })
  expect(A.findFirstOrNullBy(sample, 'Pedro', it => it.name)).toEqual(undefined)
})

test('findFirstOrNullBy', () => {
  const sample = [
    { id: 'A', name: 'Joan' },
    { id: 'B', name: 'Nathan' },
    { id: 'C', name: 'Marcus' },
    { id: 'D', name: 'Cris' },
    { id: 'E', name: 'Nathan' }
  ]

  expect(A.findFirstOrNullBy(sample, 'Nathan', it => it.name)?.id).toStrictEqual('B')
  expect(A.findFirstOrNullBy(sample, 'Pedro', it => it.name)).toEqual(undefined)
})

test('findLastOrNullBy', () => {
  const sample = [
    { id: 'A', name: 'Joan' },
    { id: 'B', name: 'Nathan' },
    { id: 'C', name: 'Marcus' },
    { id: 'D', name: 'Cris' },
    { id: 'E', name: 'Nathan' }
  ]

  expect(A.findLastOrNullBy(sample, 'Nathan', it => it.name)).toEqual({ id: 'E', name: 'Nathan' })
  expect(A.findLastOrNullBy(sample, 'Pedro', it => it.name)).toEqual(undefined)
})

test('subList', () => {
  const list = [0, 1, 2, 3]
  expect(A.subList(list, 0, 99)).toStrictEqual([0, 1, 2, 3])
  expect(A.subList(list, 0, 4)).toStrictEqual([0, 1, 2, 3])
  expect(A.subList(list, 1, 4)).toStrictEqual([1, 2, 3])
  expect(A.subList(list, 3, 4)).toStrictEqual([3])
  expect(A.subList(list, 3, 3)).toStrictEqual([])
  expect(A.subList(list, 0, 0)).toStrictEqual([])
  expect(A.subList(list, 0, -1)).toStrictEqual([0, 1, 2])
  expect(A.subList([], 90, 99)).toStrictEqual([])
})

test('associate', () => {
  expect(A.associate([0, 1, 2, 3], (it, index) => [it * 100, index]))
    .toStrictEqual([
      [0, 0],
      [100, 1],
      [200, 2],
      [300, 3]
    ])
})

test('associateBy', () => {
  expect(A.associateBy([0, 1, 2, 3], it => it * 100))
    .toStrictEqual([
      [0, 0],
      [100, 1],
      [200, 2],
      [300, 3]
    ])
})

test('associateByTransforming', () => {
  expect(
    A.associateByTransforming([0, 1, 2, 3], it => it * 100, it => it * 1000))
    .toStrictEqual([
      [0, 0],
      [100, 1000],
      [200, 2000],
      [300, 3000]
    ])
})


test('associateWith', () => {
  expect(A.associateWith([0, 1, 2, 3], it => it * 100))
    .toStrictEqual([
      [0, 0],
      [1, 100],
      [2, 200],
      [3, 300]
    ])
})

test('average', () => {
  expect(A.average([0, 0, 5, 5])).toEqual(2.5)
  expect(A.average([0, 0, 0, 5])).toEqual(1.25)
  expect(A.average([0, 0, 0, 0])).toEqual(0)
  expect(A.average([])).toEqual(NaN)
})


test('averageBy', () => {
  expect(A.averageBy([0, 0, 5, 5], it => it * 100)).toEqual(250)
  expect(A.averageBy([0, 0, 0, 5], it => it * 100)).toEqual(125)
  expect(A.averageBy([0, 0, 0, 0], it => it * 100)).toEqual(0)
  expect(A.averageBy([], it => it * 100)).toEqual(NaN)
})

test('chunkedByCount', () => {
  expect(A.chunkedByCount([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 2)).toStrictEqual([
    [0, 2, 4, 6, 8],
    [1, 3, 5, 7, 9],
  ])
})

test('chunkedBySize', () => {
  expect(A.chunkedBySize([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5)).toStrictEqual([
    [0, 2, 4, 6, 8],
    [1, 3, 5, 7, 9],
  ])
})

test('count', () => {
  expect(A.count([])).toEqual(0)
  expect(A.count([1, 2, 3])).toEqual(3)

  expect(A.count([], it => it % 2 === 0)).toEqual(0)
  expect(A.count([0, 1, 2, 3, 4], it => it % 2 === 0)).toEqual(3)
})

test('distinct', () => {
  expect(A.distinct([0, 1, 0, 2, 3, 1])).toStrictEqual([0, 1, 2, 3])
  expect(A.distinct([0, 1, 2, 3])).toStrictEqual([0, 1, 2, 3])
  expect(A.distinct([0, 1, 3, 2])).toStrictEqual([0, 1, 3, 2])
  expect(A.distinct([0, 0, 0 ,0])).toStrictEqual([0])
  expect(A.distinct([])).toStrictEqual([])
})


test('distinctWith', () => {
  const comp = (a: { age: number }, b: { age: number }) => a.age === b.age

  expect(
    A.distinctWith(
      [ { age: 0 }, { age: 1 }, { age: 0 }, { age: 2 }, { age: 3 }, { age: 1 } ], comp
    )
  ).toStrictEqual([{ age: 0 }, { age: 1 }, { age: 2 }, { age: 3 }])

  expect(
    A.distinctWith([{ age: 0 }, { age: 1 }, { age: 2 }, { age: 3 }], comp)
  ).toStrictEqual([{ age: 0 }, { age: 1 }, { age: 2 }, { age: 3 }])

  expect(
    A.distinctWith([{ age: 0 }, { age: 1 }, { age: 3 }, { age: 2 }], comp)
  ).toStrictEqual([{ age: 0 }, { age: 1 }, { age: 3 }, { age: 2 }])

  expect(
    A.distinctWith([{ age: 0 }, { age: 0 }, { age: 0 }, { age: 0 }], comp)
  ).toStrictEqual([{ age: 0 }])

  expect(A.distinctWith([], comp)).toStrictEqual([])
})

test('distinctBy', () => {

  expect(
    A.distinctBy(
      [ { age: 0 }, { age: 1 }, { age: 0 }, { age: 2 }, { age: 3 }, { age: 1 } ], it => it.age
    )
  ).toStrictEqual([{ age: 0 }, { age: 1 }, { age: 2 }, { age: 3 }])

  expect(
    A.distinctBy([{ age: 0 }, { age: 1 }, { age: 2 }, { age: 3 }], it => it.age)
  ).toStrictEqual([{ age: 0 }, { age: 1 }, { age: 2 }, { age: 3 }])

  expect(
    A.distinctBy([{ age: 0 }, { age: 1 }, { age: 3 }, { age: 2 }], it => it.age)
  ).toStrictEqual([{ age: 0 }, { age: 1 }, { age: 3 }, { age: 2 }])

  expect(
    A.distinctBy([{ age: 0 }, { age: 0 }, { age: 0 }, { age: 0 }], it => it.age)
  ).toStrictEqual([{ age: 0 }])

  expect(A.distinctBy(<{ age: number }[]>[], it => it.age)).toStrictEqual([])
})

