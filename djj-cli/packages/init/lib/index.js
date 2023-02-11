import Command from '@djj/command';
import { log } from '@djj/utils';
import createTemplate from './createTemplate.js';

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

    async action(name, opts) { // djj init vue -f -> vue { force: true }
        log.verbose('init', name, opts);
        await createTemplate(name, opts)
        return () => {}
    }
}

function Init(instance) {
    return new InitCommand(instance)
}

export default Init