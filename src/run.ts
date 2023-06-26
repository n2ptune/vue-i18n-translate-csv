import type { GenerateOption, InputOption } from './cli'
import { generateCSV, readCSV, writeJson } from './csv'
import {
  extractCurrentI18n,
  extractMatchString,
  filterGenerateTarget,
  generateMapFromUserI18n
} from './extract'
import { defaultSearchNodeConfig, getI18nPath, getSearchNodes } from './path'
import { randomString } from './util'

export async function generate(options: GenerateOption) {
  const nodes = getSearchNodes({
    ...defaultSearchNodeConfig,
    startPath: process.cwd(),
    specificSearchDir: options.sd ? [options.sd] : []
  })
  const currentI18n = await extractCurrentI18n(getI18nPath(options.input))
  const map = generateMapFromUserI18n(currentI18n)
  const matches = extractMatchString(nodes)
  const filteredMatches = filterGenerateTarget(matches, map)

  generateCSV(filteredMatches, options)
}

export function input(options: InputOption) {
  try {
    const csv = readCSV(options.csv)
    const result: { ko: Record<string, string>; en: Record<string, string> } = {
      ko: {},
      en: {}
    }

    csv.parsed.forEach(([ko, en], index) => {
      const rnd = randomString(10)
      result.ko[rnd] = ko
      result.en[rnd] = en
    })

    writeJson(JSON.stringify(result, null, 2))
  } catch (e) {
    console.log(e)
  }
}
