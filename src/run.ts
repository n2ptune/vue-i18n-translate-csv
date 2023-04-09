import type { GenerateOption, InputOption } from './cli'
import { generateCSV } from './csv'
import { extractCurrentI18n, extractMatchString, filterGenerateTarget, generateMapFromUserI18n } from './extract'
import { defaultSearchNodeConfig, getI18nPath, getSearchNodes } from './path'

export async function generate(options: GenerateOption) {
  const nodes = getSearchNodes({
    ...defaultSearchNodeConfig,
    startPath: process.cwd()
  })
  const currentI18n = await extractCurrentI18n(getI18nPath(options.input))
  const map = generateMapFromUserI18n(currentI18n)
  const matches = extractMatchString(nodes)
  const filteredMatches = filterGenerateTarget(matches, map)
  
  generateCSV(filteredMatches)
}

export async function input(options: InputOption) {}
