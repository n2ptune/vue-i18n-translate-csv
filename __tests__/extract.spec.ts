import { describe, test, expect } from 'vitest'
import { extractCurrentI18n, generateMapFromUserI18n } from '../src/extract'
import { getI18nPath } from '../src/path'
import path from 'node:path'

const testEnv = {
  i18nPath: path.resolve(__dirname, '../__tests__/src/i18n')
}

describe('extract', () => {
  test('read current i18n messages', async () => {
    const { ko, en } = await extractCurrentI18n(getI18nPath(testEnv.i18nPath))
    expect(ko).toBeDefined()
    expect(en).toBeDefined()
  })

  test('flat messages', async () => {
    const userI18n = await extractCurrentI18n(getI18nPath(testEnv.i18nPath))
    generateMapFromUserI18n(userI18n)
  })
})
