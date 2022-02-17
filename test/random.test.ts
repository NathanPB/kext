/*
 * Copyright 2021 Nathan P. Bombana
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {nextBoolean, nextDouble, nextInt} from "../src/random";
import {average, sumOf} from "../src/array";

// I know testing random stuff is weird as fuck, but cmon, I'm trying
// If a CI build fails because of that I'll be so upset

test('nextInt', () => {
  let a: number[] = []
  for (let i=0; i <= 1000; i++) {
    a = [...a, nextInt(-10, 10)]
  }

  let b: number[] = []
  for (let i=0; i <= 1000; i++) {
    b = [...b, nextInt(0, 10)]
  }

  const avgA = average(a)
  const avgB = average(b)

  expect(avgA).toBeGreaterThanOrEqual(-2)
  expect(avgA).toBeLessThanOrEqual(2)

  expect(avgB).toBeGreaterThanOrEqual(3)
  expect(avgB).toBeLessThanOrEqual(7)
})

test('nextDouble', () => {
  let a: number[] = []
  for (let i=0; i <= 1000; i++) {
    a = [...a, nextDouble(0, 1)]
  }

  const avg = average(a)
  expect(avg).toBeGreaterThanOrEqual(.4)
  expect(avg).toBeLessThanOrEqual(.7)
})

test('nextBoolean', () => {
  let a: boolean[] = []
  for (let i=0; i <= 1000; i++) {
    a = [...a, nextBoolean(.8)]
  }

  let b: boolean[] = []
  for (let i=0; i <= 1000; i++) {
    b = [...b, nextBoolean()]
  }

  let c: boolean[] = []
  for (let i=0; i <= 1000; i++) {
    c = [...c, nextBoolean(.2)]
  }

  const avgA = sumOf(a, it => it ? 1 : 0)
  const avgB = sumOf(b, it => it ? 1 : 0)
  const avgC = sumOf(c, it => it ? 1 : 0)

  expect(avgA).toBeGreaterThanOrEqual(700)
  expect(avgA).toBeLessThanOrEqual(900)

  expect(avgB).toBeGreaterThanOrEqual(400)
  expect(avgB).toBeLessThanOrEqual(600)

  expect(avgC).toBeGreaterThanOrEqual(100)
  expect(avgC).toBeLessThanOrEqual(300)
})
