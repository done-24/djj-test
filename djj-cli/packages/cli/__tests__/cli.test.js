import path from 'node:path'
import { execa } from 'execa'

const CLI = path.join(__dirname, '../bin/cli.js')
const bin = () => (...args) => execa(CLI, args)

test('run error command', async () => {
   const { stderr } = await bin()('iii')
   expect(stderr).toContain('未知命令 iii')
})

test('run help command', async () => {
    let err = null
    try {
        await bin()('--help')
    } catch(e) {
        err = e
    }
    expect(err).toBe(null)
})

test('run version command', async () => {
    const { stdout } = await bin()('--version')
    expect(stdout).toContain(require('../package.json').version)
 })

 test('run debug command',async () => {
    let err = null
    try {
        await bin()('--debug')
    } catch(e) {
        err = e
    }
    expect(err.message).toContain('launch debug mode')
 } )