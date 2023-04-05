#!/usr/bin/env node

function start() {
  return import('../dist/cli.esm.js')
}

start()