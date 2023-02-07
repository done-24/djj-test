const Command = require('@djj/command');

class InitCommand extends Command {
    get command() {
        return 'init [name]'
    }

    get description() {
        return 'init project'
    }

    get options() {
        return [
            ['-f, --force', '是否强制执行', false]
        ]
    }

    get action() { // djj init vue -f -> vue { force: true }
        return (name, ops) => {
            console.log(name, ops)
        }
    }
}

function Init(instance) {
    return new InitCommand(instance)
}

module.exports = Init