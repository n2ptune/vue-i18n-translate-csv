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
}

export interface InputOption extends GlobalCliOption {
  i: string
  input: string
  k: string
  korean: string
  e: string
  english: string
}

cli
  .command('generate', 'generate csv file')
  .alias('gen')
  .alias('g')
  .option('-i, --input <directory>', 'directory containing all messages', {
    default: './src/i18n'
  })
  .action(async (options: GenerateOption) => {
    await generate(options)
  })

cli
  .command('input', 'read csv file and overwrite message file')
  .alias('i')
  .option('-i, --input <file>', 'csv file')
  .option('-k, --korean <file>', 'included Korean message file')
  .option('-e, --english <file>', 'included English message file')
  .action((options: InputOption) => {
    console.log(options)
  })

cli.help()
cli.parse()
