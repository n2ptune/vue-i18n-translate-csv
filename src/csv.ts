import fs from 'node:fs'
import path from 'node:path'
import papaparse from 'papaparse'
import { GenerateOption } from './cli'
// import { runInSheet } from './sheet'

export function generateCSV(sourceText: string[] = [], options: GenerateOption) {
  const result: string[] = []
  const rawText: string[] = []
  const rawTranslateFnText: string[] = []

  for (let i = 0; i < sourceText.length; i++) {
    const text = sourceText[i]
    result.push(`"${text}","=GOOGLETRANSLATE(A${i + (options.useSheetApi ? 2 : 1)}, ${options.useSheetApi ? '"ko", "en"' : '""ko"", ""en"""'})`)
    rawText.push(text)
    rawTranslateFnText.push(`=GOOGLETRANSLATE(A${i + (options.useSheetApi ? 2 : 1)}, ${options.useSheetApi ? '"ko", "en"' : '""ko"", ""en"""'})`)
  }

  const writeResult = result.join('\n')

  if (options.useSheetApi) {
    // runInSheet(writeResult, rawText, rawTranslateFnText)
  } else {
    fs.writeFileSync(
      path.resolve(process.cwd(), `translate-${Date.now()}.csv`),
      writeResult,
      'utf-8'
    )
    }
}

export function readCSV(csvName: string) {
  if (!csvName.endsWith('.csv')) csvName = csvName + '.csv'
  const csvPath = path.resolve(process.cwd(), csvName)
  const csv = fs.readFileSync(csvPath, 'utf-8')
  const parsed = papaparse.parse(csv)
  return {
    origin: csv,
    parsed: parsed.data as [string, string]
  }
}

export function writeJson(json: string) {
  const fileName = 'translated.json'
  fs.writeFileSync(path.resolve(process.cwd(), fileName), json, 'utf-8')
}
