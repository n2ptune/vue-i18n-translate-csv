import { describe, expect, test } from 'vitest'
import { getSearchNodes, defaultSearchNodeConfig } from '../src/path'
import path from 'node:path'

const testEnv = {
  startPath: path.resolve(__dirname, '../'),
  sourcePath: path.resolve(__dirname, '../__tests__/src')
}

describe('path', () => {
  test('search node', () => {
    const nodes = getSearchNodes({
      ...defaultSearchNodeConfig,
      startPath: testEnv.startPath,
      ignore: [testEnv.sourcePath]
    })
    expect(nodes).toHaveLength(4) // include ignore paths
  })

  test('search node includes ignored paths', () => {
    const nodes = getSearchNodes({
      ...defaultSearchNodeConfig,
      ignore: ['__tests__/vue/ignore_path', testEnv.sourcePath],
      startPath: testEnv.startPath
    })
    expect(nodes).toHaveLength(3) // not include ignore paths
  })
})
