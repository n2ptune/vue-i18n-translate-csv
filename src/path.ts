import path from 'node:path'
import url from 'node:url'
import fs from 'node:fs'

export interface SearchNodeConfig {
  ignore: string[]
  searchPattern: RegExp[]
  startPath: string
  specificSearchDir: string[]
}

export const __DIR_NAME__ = path.dirname(url.fileURLToPath(import.meta.url))

export const __FILE_NAME__ = url.fileURLToPath(import.meta.url)

export const filePattern = [/\.js$/, /\.vue$/]

export const defaultSearchNodeConfig: SearchNodeConfig = {
  ignore: ['node_modules', '.git', 'dist', 'bin'],
  searchPattern: filePattern,
  startPath: path.resolve(__DIR_NAME__),
  specificSearchDir: ['node_modules/@sd-fe/cmp-core']
}

function _getSearchNodes(config: SearchNodeConfig): string[] {
  const resultFile: string[] = []

  function search(searchPath: string, requiredIgnore = true) {
    try {
      const nodes = fs.readdirSync(searchPath, { withFileTypes: true })

      if (nodes && nodes.length) {
        nodes.forEach((node) => {
          if (node.isDirectory()) {
            if (
              requiredIgnore &&
              config.ignore.every(
                (ignorePath) => !ignorePath.includes(node.name)
              )
            ) {
              search(path.resolve(searchPath, node.name), requiredIgnore)
            }
          } else if (config.searchPattern.some((reg) => reg.test(node.name))) {
            resultFile.push(path.resolve(searchPath, node.name))
          }
        })
      }
    } catch (err) {}
  }

  search(config.startPath)

  if (config.specificSearchDir.length) {
    config.specificSearchDir.forEach((dir) =>
      search(path.resolve(config.startPath, dir), false)
    )
  }

  return resultFile
}

export function getSearchNodes(
  config: SearchNodeConfig = defaultSearchNodeConfig
) {
  return _getSearchNodes(config)
}
