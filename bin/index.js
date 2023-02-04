#!/usr/bin/env node

const commander = require('commander')
const pkg = require('../package.json')
// const { program } = commander

const program = new commander.Command()

program
    .usage('[command] <options>')
    .version(pkg.version)
    .option('-d, --debug', '是否开启调试模式', false)
    .option('-e, --env <env>', '获取环境变量')
    

const clone = program.command('clone <source> [destination]')
clone
    .description('clone a repository')
    .option('-f, --force', '是否强制克隆')
    .action((source, destination, cmdObj) => {
    console.log('do clone', source,  destination, cmdObj)
})

// addCommand 注册子命令
const service = new commander.Command('services')
service
    .command('start [port]')
    .description('start service by port')
    .action(port => {
        console.log(port)
    })

const opts = program.opts()
console.log(opts)

program.addCommand(service)

// program
//     .command('install [name]', 'install package', {
//         executableFile: 'dyj-cli',
//         isDefault: true,
//         // hidden: true
//     })

program
    .arguments('<cmd> [options]')
    .description('test command', {
        cmd: 'command to run',
        options: 'options for command'
    })
    .action((cmd, options) => {
        console.log(cmd,options )
    })

program.parse(process.args)