import { program } from 'commander'
import createInitCommand from '@djj/init'
import semver from 'semver'
import path from 'node:path'
import { dirname } from 'dirname-filename-esm'
import { log } from '@djj/utils'
import chalk from 'chalk'
import fse from 'fs-extra'

const LOWEST_NODE_VERSION = '14.0.0'
const __dirname = dirname(import.meta)
const pkgPath = path.resolve(__dirname, '../package.json')
const pkg = fse.readJSONSync(pkgPath)

function checkNodeVersion() {
    log.verbose('node version', process.version)
    if(!semver.gte(process.version, LOWEST_NODE_VERSION)) {
        throw new Error(chalk.red(`cli 需要安装${LOWEST_NODE_VERSION}以上的版本node.js`))
    }
}

export default () => {
    program
        .name(Object.keys(pkg.bin)[0])
        .usage(`<command> [options]`)
        .hook('preAction', checkNodeVersion)
        .version(pkg.version)
        .option('-d, --debug', '是否开启调试模式', false)

    createInitCommand(program)
    
    program.parse(process.argv)
}