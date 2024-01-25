import { describe, test, expect } from 'vitest'
import {
  extractCurrentI18n,
  extractMatchString,
  filterGenerateTarget,
  generateMapFromUserI18n
} from '../src/extract'
import {
  defaultSearchNodeConfig,
  getI18nPath,
  getSearchNodes
} from '../src/path'
import path from 'node:path'

const testEnv = {
  i18nPath: path.resolve(__dirname, '../__tests__/src/i18n'),
  startPath: path.resolve(__dirname, '../'),
  sourcePath: path.resolve(__dirname, '../__tests__/src')
}

const testNodes = () =>
  getSearchNodes({
    ...defaultSearchNodeConfig,
    startPath: testEnv.startPath,
    ignore: [testEnv.sourcePath]
  })

const testI18n = () => extractCurrentI18n(getI18nPath(testEnv.i18nPath))

describe('extract', () => {
  test('read current i18n messages', async () => {
    const { ko, en } = await testI18n()
    expect(ko).toBeDefined()
    expect(en).toBeDefined()
  })

  test('flat messages', async () => {
    const userI18n = await testI18n()
    generateMapFromUserI18n(userI18n)
  })

  test('generate map', async () => {
    const userI18n = await testI18n()
    const { ko } = generateMapFromUserI18n(userI18n)
    expect(ko).toBeDefined()
    expect(ko.size).toBe(3)
  })

  test('matched string', () => {
    const nodes = testNodes()
    const matched = extractMatchString(nodes)
    expect(matched).toBeTypeOf('object')
    expect(matched).toHaveLength(10)
  })

  test('filter not translated text', async () => {
    const nodes = testNodes()
    const userI18n = await testI18n()
    const i18nMap = generateMapFromUserI18n(userI18n)
    const matched = extractMatchString(nodes)
    const filtered = filterGenerateTarget(matched, i18nMap)
    expect(filtered).toBeDefined()
    expect(filtered).toHaveLength(9)
  })
})
