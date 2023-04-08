import type { ResultI18nPath } from './path'

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

export function generateMapFromUserI18n(i18n: UserI18n) {
  const flatKo = flatObject(i18n.ko)
  const flatEn = flatObject(i18n.en)

  console.log(flatKo, flatEn)
}

export async function extractCurrentI18n(
  i18nPath: ResultI18nPath
): Promise<UserI18n<any>> {
  const ko = await import(i18nPath.ko)
  const en = await import(i18nPath.en)

  return {
    ko: ko.default,
    en: en.default
  }
}
