import { cac } from 'cac'
import { name } from '../package.json'

const cli = cac(name)

interface GlobalCliOption {
  '--': string[]
}

interface GenerateOption extends GlobalCliOption {
  i: string
  input: string
}

interface InputOption extends GlobalCliOption {
  i: string
  input: string
  k: string
  korean: string
  e: string
  english: string
}

// cli

//   .option('-w, --write <file>', 'CSV name to input', {
//     default: './translated.csv'
//   })
//   .option('-o, --output <file>', 'CSV name to output', {
//     default: './trasnlate.csv'
//   })

cli
  .command('generate [root]', 'generate csv file')
  .alias('gen')
  .alias('g')
  .option('-i, --input <file>', 'file containing all messages', {
    default: './src/i18n/ko/index.js'
  })
  .action((root: string = '', description: GenerateOption) => {
    console.log(root, description)
  })

cli
  .command('input [root]', 'read csv file and overwrite message file')
  .alias('i')
  .option('-i, --input <file>', 'csv file')
  .option('-k, --korean <file>', 'included Korean message file')
  .option('-e, --english <file>', 'included English message file')
  .action((root: string = '', description: InputOption) => {
    console.log(root, description)
  })

cli.help()
cli.parse()
