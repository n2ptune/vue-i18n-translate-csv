import { describe, expect, test, vitest } from 'vitest'
import { generateCSV } from '../src/csv'
import { generate } from '../src/run'
import path from 'node:path'

describe('csv', () => {
  test('generate csv', async () => {
    await generate({
      i: path.resolve(__dirname, '../__tests__/src/i18n'),
      input: path.resolve(__dirname, '../__tests__/src/i18n')
    })
  })

  test('parse export default', () => {
    // const parse = (str: string) => {
    //   return JSON.parse(str.split('export default')[1])
    // }
    // expect(
    //   parse(`export default {
    //   MESSAGE: '1'
    // }`)
    // ).toHaveProperty('MESSAGE')
  })
})
