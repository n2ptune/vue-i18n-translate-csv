import path from 'node:path'
import url from 'node:url'
import fs from 'node:fs'

const defaultIgnorePaths = ['node_modules', '.git', 'dist', 'bin']

function setConfig(config: SearchNodeConfig): SearchNodeConfig {
  return {
    ignore: [...new Set([...defaultIgnorePaths, ...config.ignore])],
    searchPattern: config.searchPattern,
    specificSearchDir: config.specificSearchDir,
    startPath: config.startPath
  }
}

function _getSearchNodes(config: SearchNodeConfig): string[] {
  const resultFile: string[] = []
  const ignoreFullPaths = config.ignore.map((p) =>
    path.resolve(config.startPath, p)
  )

  function search(searchPath: string, requiredIgnore = true) {
    try {
      const nodes = fs.readdirSync(searchPath, { withFileTypes: true })

      if (nodes && nodes.length) {
        nodes.forEach((node) => {
          if (node.isDirectory()) {
            if (
              requiredIgnore &&
              !ignoreFullPaths.includes(path.resolve(searchPath, node.name))
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
  ignore: defaultIgnorePaths,
  searchPattern: filePattern,
  startPath: path.resolve(__DIR_NAME__),
  specificSearchDir: []
}

export function getI18nPath(inputPath?: string) {
  if (!inputPath) {
    inputPath = path.resolve(__DIR_NAME__, 'src', 'i18n')
  }
}

export function getSearchNodes(
  config: SearchNodeConfig = defaultSearchNodeConfig
) {
  return _getSearchNodes(setConfig(config))
}
