import fs from 'node:fs'
import path from 'node:path'

export function generateCSV(sourceText: string[] = []) {
  const result: string[] = []

  for (let i = 0; i < sourceText.length; i++) {
    const text = sourceText[i]
    result.push(`${text},"=GOOGLETRANSLATE(A${i + 1}, ""ko"", ""en"")"`)
  }

  const writeResult = result.join('\n')

  fs.writeFileSync(path.resolve(process.cwd(), `translate-${Date.now()}.csv`), writeResult, 'utf-8')
}

export function inputCSV(csvPath: string) {}
