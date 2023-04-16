import type { GenerateOption, InputOption } from './cli'
import { generateCSV, readCSV } from './csv'
import {
  extractCurrentI18n,
  extractI18nFileRaw,
  extractMatchString,
  filterGenerateTarget,
  generateMapFromUserI18n
} from './extract'
import { defaultSearchNodeConfig, getI18nPath, getSearchNodes } from './path'
import { randomString } from './util'

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

export function input(options: InputOption) {
  try {
    const csv = readCSV(options.csv)
    const currentI18n = extractI18nFileRaw(getI18nPath(options.input))

    csv.parsed.forEach(([ko, en], index) => {
      let ends = ','

      if (index === csv.parsed.length - 1) {
        ends = ''
      }

      const rnd = randomString(10)
      currentI18n.ko.push(`  ${rnd}: '${ko}'${ends}`)
      currentI18n.en.push(`  ${rnd}: '${en}'${ends}`)
    })

    currentI18n.ko.push('}')
    currentI18n.en.push('}')

    console.log(currentI18n)
  } catch (e) {
    console.log(e)
    // process.stdout.write('Something wrong')
    // process.exit(-1)
  }
}
