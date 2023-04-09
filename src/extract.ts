import type { ResultI18nPath } from './path'
import fs from 'node:fs'
import url from 'node:url'

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
   */
  const funcRegex = /\$v\(([^()]*)\)/gim
  /**
   * 작은 따옴표, 큰 따옴표만 검사한다.
   * 백틱을 검사할 경우 자바스크립트 표현식이 포함될 수 있기 때문에 검사하지 않는다.
   * 백틱까지 검사하려면 `/('|"|`).*?('|"|`)/gim`
   */
  const quoteRegex = /('|").*?('|")/gim
  const matched: string[] = []

  for (const filePath of files) {
    const file = fs.readFileSync(filePath, 'utf-8')
    const matches = file.match(funcRegex)
    if (matches && matches.length) {
      for (const inner of matches) {
        const doubleMatch = inner.match(quoteRegex)
        if (doubleMatch && doubleMatch.length === 1) {
          // 양쪽 끝 삭제
          matched.push(doubleMatch[0].slice(1, doubleMatch[0].length - 1))
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