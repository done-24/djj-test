import Command from '@djj/command';
import { log } from '@djj/utils';
import createTemplate from './createTemplate.js';
import downloadTemplate from './downloadTemplate.js';
import installTemplate from './installTemplate.js';

class InitCommand extends Command {
    get command() {
        return 'init [name]'
    }

    get description() {
        return 'init project'
    }

    get options() {
        return [
            ['-f, --force', '是否强制执行', false],
            ['-t, --type <type>', '项目类型(值：project/page)'],
            ['-tp, --template <template>', '模板名称']
        ]
    }

    async action(name, opts) { // djj init vue -f -> vue { force: true }
        log.verbose('init', name, opts);
        const selectedTemplate = await createTemplate(name, opts)
        await downloadTemplate(selectedTemplate)
        await installTemplate(selectedTemplate, opts)
    }
}

function Init(instance) {
    return new InitCommand(instance)
}

export default Init