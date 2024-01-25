import { ResultI18nPath, __DIR_NAME__ } from './path'
import fs from 'node:fs'
import url from 'node:url'
import path from 'node:path'

function flatObject(input: any) {
  function flat(res: any, key: string, val: any, pre = '') {
    const prefix = [pre, key].filter((v) => v).join('.')
    return typeof val === 'object'
      ? Object.keys(val).reduce(
          (prev, curr): any => flat(prev, curr, val[curr], prefix),
          res
        )
      : Object.assign(res, { [prefix]: val })
  }
  return Object.keys(input).reduce(
    (prev, curr) => flat(prev, curr, input[curr]),
    {}
  )
}

export interface UserI18n<T = string> {
  ko: Record<string, T>
  en: Record<string, T>
}

export interface UserI18nMap {
  ko: Map<string, string>
  revKo: Map<string, string>
  en: Map<string, string>
  revEn: Map<string, string>
}

export function generateMapFromUserI18n(i18n: UserI18n): UserI18nMap {
  const flatKo = flatObject(i18n.ko)
  const flatEn = flatObject(i18n.en)

  const genMap = (messages: any, reversed = false) => {
    const map = new Map()

    Object.keys(messages).forEach((key) => {
      if (reversed) map.set(messages[key], key)
      else map.set(key, messages[key])
    })

    return map
  }

  return {
    en: genMap(flatEn, false),
    ko: genMap(flatKo, false),
    revEn: genMap(flatEn, true),
    revKo: genMap(flatKo, true)
  }
}

export function extractMatchString(files: string[]): string[] {
  /**
   * $v 호출부를 검사한다.
   * @fix 2024-01-25
   * - 문자열이 함수 호출 끝맺음을 뜻하는 닫힌 괄호로 끝나는 경우
   * 문자열 전부를 매칭하지 못하는 경우까지 고려해야 하므로 정규식 수정
   */
  // const funcRegex = /\$v\(([^()]*)\)/gim
  const funcRegex = /\$v\s*\((?:(?:(?:(?<!\\)['"])[^'"]*(?<!\\)['"])|[^)]*)*\)/gim
  /**
   * 작은 따옴표, 큰 따옴표만 검사한다.
   * 백틱을 검사할 경우 자바스크립트 표현식이 포함될 수 있기 때문에 검사하지 않는다.
   * 백틱까지 검사하려면 `/('|"|`).*?('|"|`)/gim`
   */
  // const quoteRegex = /('|").*?('|")/gim
  const quoteRegex = /(?:['"].*['"]\))|(?:['"].*['"],)/gim
  const matched: string[] = []

  for (const filePath of files) {
    const file = fs.readFileSync(filePath, 'utf-8')
    const matches = file.match(funcRegex)
    if (matches && matches.length) {
      for (const inner of matches) {
        const doubleMatch = inner.match(quoteRegex)
        if (doubleMatch && doubleMatch.length) {
          // 양쪽 끝 삭제
          const rawText = doubleMatch[0]
            .slice(1, doubleMatch[0].length - 2)
            .replace(/"/gmi, '""')
          matched.push(rawText)
        }
      }
    }
  }

  return [...new Set(matched)]
}

export function filterGenerateTarget(korean: string[], i18nMap: UserI18nMap) {
  const filtered: string[] = []

  for (const text of korean) {
    if (!i18nMap.revKo.get(text)) filtered.push(text)
  }

  return filtered
}

export async function extractCurrentI18n(
  i18nPath: ResultI18nPath
): Promise<UserI18n<any>> {
  const ko = await import(url.pathToFileURL(i18nPath.ko).href)
  const en = await import(url.pathToFileURL(i18nPath.en).href)

  return {
    ko: ko.default,
    en: en.default
  }
}

export function extractI18nFileRaw(i18nPath: ResultI18nPath): {
  ko: string[]
  en: string[]
} {
  const koRaw = fs.readFileSync(
    path.resolve(__DIR_NAME__, i18nPath.ko),
    'utf-8'
  )
  const enRaw = fs.readFileSync(
    path.resolve(__DIR_NAME__, i18nPath.en),
    'utf-8'
  )

  const ko = parseToObjectFromString(koRaw)
  const en = parseToObjectFromString(enRaw)

  return {
    ko,
    en
  }
}

export function parseToObjectFromString(str: string) {
  // [ '{}', ..... TODO(input last) -> '}']
  const parse = str.split('export default')[1].trim().split('\n').slice(0, -1)

  if (!parse[parse.length - 1].endsWith(',')) {
    parse[parse.length - 1] = parse[parse.length - 1] + ','
  }

  return parse
}
