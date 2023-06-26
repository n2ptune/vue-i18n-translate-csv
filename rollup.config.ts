import { defineConfig, type RollupOptions } from 'rollup'
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import dts from 'rollup-plugin-dts'

const globalPlugins: RollupOptions['plugins'] = [
  typescript(),
  json(),
  commonjs({
    extensions: ['.js'],
    sourceMap: false
  }),
  nodeResolve(),
  terser()
]

const mainConfig: RollupOptions = defineConfig({
  input: './src/index.ts',
  output: [
    {
      file: './dist/index.mjs',
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
      file: './dist/cli.mjs',
      format: 'esm'
    },
    {
      file: './dist/cli.cjs',
      format: 'cjs'
    }
  ],

  plugins: globalPlugins
})

const dtsConfig: RollupOptions = defineConfig({
  input: './dist/types/src/index.d.ts',
  output: [{ file: 'types/index.d.ts', format: 'es' }],
  plugins: [dts()]
})

export default [mainConfig, cliConfig, dtsConfig]
