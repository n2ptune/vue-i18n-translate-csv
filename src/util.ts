import path from 'node:path'

export function genPath(_path: string) {
  return path.resolve(__dirname, _path)
}

export function randomString(length: number) {
  function pickRange(min: number, max: number) {
    const pick = []

    for (let i = min; i <= max; i++) {
      pick.push(i)
    }

    return pick
  }

  function getRndHash(rnd: number) {
    const ranges = [
      ...pickRange(48, 57),
      ...pickRange(65, 90),
      ...pickRange(97, 122)
    ]
    const rndStr = []

    for (let i = 0; i < rnd; i++) {
      rndStr.push(ranges[Math.floor(Math.random() * (ranges.length - 1))])
    }

    return rndStr.map((num) => String.fromCharCode(num)).join('')
  }

  return getRndHash(length)
}
