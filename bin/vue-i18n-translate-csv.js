#!/usr/bin/env node --experimental-specifier-resolution=node

function start() {
  return import('../dist/cli.mjs')
}

start()