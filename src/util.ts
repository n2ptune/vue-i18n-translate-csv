import path from 'node:path'

export function genPath(_path: string) {
  return path.resolve(__dirname, _path)
}
