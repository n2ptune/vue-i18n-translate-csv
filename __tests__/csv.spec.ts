import { describe, expect, test } from 'vitest'
import { parseToObjectFromString } from '../src/extract'
import { generate, input } from '../src/run'
import path from 'node:path'

describe('csv', () => {
  test('generate csv', async () => {
    // await generate({
    //   i: path.resolve(__dirname, '../__tests__/src/i18n'),
    //   input: path.resolve(__dirname, '../__tests__/src/i18n')
    // })
  })

  test('parse export default', () => {
    expect(
      parseToObjectFromString(`export default {
      MESSAGE: 1
    }`)
    ).toHaveLength(2)
  })

  test('input csv', () => {
    input({
      c: 'translate-1681223969702.csv',
      csv: 'translate-1681223969702.csv',
      i: path.resolve(__dirname, '../__tests__/src/i18n'),
      input: path.resolve(__dirname, '../__tests__/src/i18n')
    })
  })
})
