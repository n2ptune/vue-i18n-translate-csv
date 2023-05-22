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
  const specificSearchDir = config.specificSearchDir.map((p) =>
    path.resolve(config.startPath, p)
  )

  function search(searchPath: string) {
    try {
      const nodes = fs.readdirSync(searchPath, { withFileTypes: true })

      if (nodes && nodes.length) {
        nodes.forEach((node) => {
          if (node.isDirectory()) {
            // if (
            //   ignoreFullPaths.every(
            //     (p) => !path.resolve(searchPath, node.name).includes(p)
            //   ) &&
            //   (specificSearchDir.length
            //     ? !specificSearchDir.some((p) =>
            //         path.resolve(searchPath, node.name).includes(p)
            //       )
            //     : true)
            // ) {
            search(path.resolve(searchPath, node.name))
            // }
          } else if (config.searchPattern.some((reg) => reg.test(node.name))) {
            if (
              specificSearchDir.some((p) =>
                path.resolve(searchPath, node.name).includes(p)
              )
            ) {
              resultFile.push(path.resolve(searchPath, node.name))
            }
            if (
              ignoreFullPaths.some((p) =>
                path.resolve(searchPath, node.name).includes(p)
              )
            )
              return
            resultFile.push(path.resolve(searchPath, node.name))
          }
        })
      }
    } catch (err) {}
  }

  search(config.startPath)

  console.log(resultFile)

  return resultFile
}

export interface SearchNodeConfig {
  ignore: string[]
  searchPattern: RegExp[]
  startPath: string
  specificSearchDir: string[]
}

export interface ResultI18nPath {
  ko: string
  en: string
  i18nPath: string
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

export function getI18nPath(inputPath?: string): ResultI18nPath {
  if (!inputPath) {
    inputPath = path.resolve(__DIR_NAME__, 'src', 'i18n')
  } else {
    inputPath = path.resolve(inputPath)
  }
  return {
    ko: path.resolve(inputPath, 'ko.js'),
    en: path.resolve(inputPath, 'en.js'),
    i18nPath: inputPath
  }
}

export function getSearchNodes(
  config: SearchNodeConfig = defaultSearchNodeConfig
) {
  return _getSearchNodes(setConfig(config))
}
