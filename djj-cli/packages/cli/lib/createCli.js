import path from 'node:path'
import { dirname } from 'dirname-filename-esm'
import { program } from 'commander'
import semver from 'semver'
import chalk from 'chalk'
import fse from 'fs-extra'
import { log } from '@djj/utils'

const __dirname = dirname(import.meta)
const pkgPath = path.resolve(__dirname, '../package.json')
const pkg = fse.readJSONSync(pkgPath)

const LOWEST_NODE_VERSION = '14.0.0'

function checkNodeVersion() {
    log.verbose('node version', process.version)
    if(!semver.gte(process.version, LOWEST_NODE_VERSION)) {
        throw new Error(chalk.red(`cli 需要安装${LOWEST_NODE_VERSION}以上的版本node.js`))
    }
}

export default function createCli() {
    program
    .name(Object.keys(pkg.bin)[0])
    .usage(`<command> [options]`)
    .hook('preAction', checkNodeVersion)
    .version(pkg.version)
    .option('-d, --debug', '是否开启调试模式', false)

    program.on('option:debug', () => {
        if(program.opts().debug) {
            log.verbose('debug', 'launch debug mode')
        }
    })
    program.on('command:*', (obj) => {
        log.error('未知命令', obj[0])
    })

    return program
}