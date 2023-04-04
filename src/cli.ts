import { cac } from 'cac'
import { name } from '../package.json'

const cli = cac(name)

cli.parse()
