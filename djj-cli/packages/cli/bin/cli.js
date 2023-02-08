#!/usr/bin/env node

import importLocal from 'import-local'
import { log } from '@djj/utils'
import entry  from '../lib/index.js'
import { fileURLToPath } from 'node:url'

if(importLocal(fileURLToPath(import.meta.url))) {
    log.info('cli', '使用本地的cli版本')
} else {
    entry(process.argv.slice(2))
}
