#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers');
const dedent = require('dedent');
const { recommendCommands } = require('yargs');

const cli = yargs(hideBin(process.argv))

cli
.usage('Usage: dyj [command] <options>')
.demandCommand(1, 'A commond is required. Pass --help to see all available commands and options')
.strict()
.recommendCommands()
.fail((err, msg) => {
    console.log('err', err)
    console.log('msg', msg)
})
.alias('h', 'help')
.alias('v', 'version')
.wrap(cli.terminalWidth())
.options({
    debug: {
        type: 'boolean',
        describe: 'Bootstrap debug mode',
        alias: 'd'
    }
})
.option('registry', {
    type: 'string',
    describe: 'Define global registry',
    alias: 'r'
})
.group(['debug'], 'Dev Options: ')
.group(['registry'], 'Extra Options: ')
.command('init [name]', 'Do init a project', (yargs) => {
    yargs.option('name', {
        type: 'string',
        alias: 'n',
        describe: 'Name of a project'
    })
}, (argv) => {
    console.log(argv)
})
.command({
    command: 'configure <key> [value]',
    aliases: ['config', 'cfg'],
    desc: 'Set a config variable',
    builder: (yargs) => yargs.default('value', 'true'),
    handler: (argv) => {
      console.log(`setting ${argv.key} to ${argv.value}`)
    }
})
.epilogue(dedent`when a commnd fails, all logs will print`)
.argv;