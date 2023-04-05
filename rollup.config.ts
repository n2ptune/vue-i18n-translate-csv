import { defineConfig, type RollupOptions } from 'rollup'
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

const globalPlugins: RollupOptions['plugins'] = [
  typescript(),
  json(),
  nodeResolve(),
  terser()
]

const mainConfig: RollupOptions = defineConfig({
  input: './src/index.ts',
  output: [
    {
      file: './dist/index.esm.js',
      format: 'esm'
    },
    {
      file: './dist/index.cjs',
      format: 'cjs'
    }
  ],
  plugins: globalPlugins
})

const cliConfig: RollupOptions = defineConfig({
  input: './src/cli.ts',
  output: [
    {
      file: './dist/cli.esm.js',
      format: 'esm'
    },
    {
      file: './dist/cli.cjs',
      format: 'cjs'
    }
  ],
  plugins: globalPlugins
})

export default [mainConfig, cliConfig]
