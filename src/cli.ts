import { cac } from 'cac'
import { name } from '../package.json'
import { generate, input } from './run'

const cli = cac(name)

interface GlobalCliOption {
  '--'?: string[]
}

export interface GenerateOption extends GlobalCliOption {
  i: string
  input: string
  sd?: string
  specificDir?: string
  u: boolean
  useSheetApi: boolean
}

export interface InputOption extends GlobalCliOption {
  i: string
  input: string
  c: string
  csv: string
}

cli
  .command('generate', 'generate csv file')
  .alias('gen')
  .alias('g')
  .option('-i, --input <directory>', 'directory containing all messages', {
    default: './src/i18n'
  })
  .option('-sd, --specificDir <directory>', 'specific directory')
  .option('-u, --useSheetApi', 'auto extract translated result with google sheet api', {
    default: false
  })
  .action(async (options: GenerateOption) => {
    await generate(options)
  })

cli
  .command('input', 'read csv file and overwrite message file')
  .alias('in')
  .alias('i')
  .option('-i, --input <directory>', 'directory containing all messages', {
    default: './src/i18n'
  })
  .option('-c, --csv <file>', 'csv file')
  .action(async (options: InputOption) => {
    await input(options)
  })

cli.help()
cli.parse()
