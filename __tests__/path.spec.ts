import { describe, expect, test } from 'vitest'
import { getSearchNodes, defaultSearchNodeConfig } from '../src/path'
import path from 'node:path'

describe('path', () => {
  test('search node', () => {
    const nodes = getSearchNodes({
      ...defaultSearchNodeConfig,
      startPath: path.resolve(__dirname, '../')
    })
    expect(nodes).toHaveLength(2)
  })
})
