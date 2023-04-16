import { describe, expect, test} from 'vitest'
import { randomString } from '../src/util'

describe('util', () => {
  test('randomString', () => {
    expect(randomString(5)).toHaveLength(5)
    expect(randomString(10)).toHaveLength(10)
    expect(randomString(15)).toHaveLength(15)
    expect(randomString(20)).toHaveLength(20)
    expect(randomString(25)).toHaveLength(25)
    expect(randomString(30)).toHaveLength(30)
    expect(randomString(1024)).toHaveLength(1024)
  })
})