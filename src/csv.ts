import fs from 'node:fs'
import path from 'node:path'
import papaparse from 'papaparse'

export function generateCSV(sourceText: string[] = []) {
  const result: string[] = []

  for (let i = 0; i < sourceText.length; i++) {
    const text = sourceText[i]
    result.push(`${text},"=GOOGLETRANSLATE(A${i + 1}, ""ko"", ""en"")"`)
  }

  const writeResult = result.join('\n')

  fs.writeFileSync(
    path.resolve(process.cwd(), `translate-${Date.now()}.csv`),
    writeResult,
    'utf-8'
  )
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
