import createInitCommand from '@djj/init'
import createCli from './createCli.js'
import './exception.js'

export default () => {
    const program = createCli()
    createInitCommand(program)
    program.parse(process.argv)
}