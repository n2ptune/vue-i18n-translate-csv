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
    expect(nodes).toHaveLength(6) // include ignore paths
  })

  test('search node includes ignored paths', () => {
    const nodes = getSearchNodes({
      ...defaultSearchNodeConfig,
      ignore: [path.resolve(__dirname, '../__tests__/vue/ignore_path'), testEnv.sourcePath],
      startPath: testEnv.startPath
    })
    expect(nodes).toHaveLength(4) // not include ignore paths
  })

  test('specific start path', () => {
    const nodes = getSearchNodes({
      ...defaultSearchNodeConfig,
      ignore: [path.resolve(__dirname, '../__tests__/vue/ignore_path'), testEnv.sourcePath],
      startPath: path.resolve(testEnv.startPath, '__tests__', 'vue', 'deep')
    })
    expect(nodes).toHaveLength(1)
  })

  test('specific includes path', () => {
    const nodes = getSearchNodes({
      ...defaultSearchNodeConfig,
      ignore: [path.resolve(__dirname, '../__tests__/vue/ignore_path'), testEnv.sourcePath], // ignore 2 files
      specificSearchDir: [path.resolve(__dirname, '../__tests__/vue/ignore_path/more-deep/here')], // ignored 2 files from ignore options but serach directly 1 file
      startPath: path.resolve(testEnv.startPath, '__tests__', 'vue')
    })
    expect(nodes).toHaveLength(4)
  })
})
