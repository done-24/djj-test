class Command {
    program = null

    constructor(instance) {
        if(!instance) {
            throw new Error('command instance must not be null!')
        }

        this.program = instance
        const cmd = this.program.command(this.command)
        cmd.hook('preAction', () => {
            this.preAction()
        })
        cmd.hook('postAction', () => {
            this.postAction()
        })
        cmd.description(this.description)
        if(this.options?.length) {
            this.options.forEach(option => {
                cmd.option(...option)
            })
        }
        cmd.action(this.action)
    }

    get command() {
        throw new Error('command must be implements')
    }

    get description() {
        throw new Error('description must be implements')
    }

    get options() {
        return []
    }

    get action() {
        throw new Error('action must be implements')
    }

    get preAction() {
        return () => {
            console.log('preAction')
        }
    }

    get postAction() {
        return () => {
            console.log('postAction')
        }
    }
}

module.exports = Command