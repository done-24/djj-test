import { log, makeList, makeInput, getLatestVersion } from "@djj/utils"
import { homedir } from 'node:os'
import path from 'node:path';

const ADD_TYPE_PROJECT = 'project'
const ADD_TYPE_PAGE = 'page'
const ADD_TEMPLATE = [
    {
        name: 'vue',
        npmName: 'vue',
        value: 'template_vue',
        version: '1.0.0'
    },
    {
        name: 'react',
        npmName: 'react',
        vaule: 'template_react',
        version: '1.0.0'
    }
]

const ADD_TYPE = [
    {   
        name: '项目',
        value: ADD_TYPE_PROJECT
    },
    {
        name: '页面',
        value: ADD_TYPE_PAGE
    }
]

const TEMP_HOME = '.cli-djj';

function makeTargetPath() {
    return path.resolve(`${homedir()}/${TEMP_HOME}`, 'addTemplate');
}

function getAddType() {
    return makeList({
        choices: ADD_TYPE,
        message: '请选择初始化类型',
        defaultValue: ADD_TYPE_PROJECT
    })
}

function getAddName() {
    return makeInput({
        message: '请输入项目名称',
        defaultValue: '',
        validate(v) {
            if(v.length > 0) {
                return true
            }
            return '请输入项目名称'
          },
    })
}

function getAddTemplate() {
    return makeList({
        choices: ADD_TEMPLATE,
        message: '请选择项目模版'
    })
}

async function createTemplate(name, ops) {
    const { type, template } = ops
    const addType = type || await getAddType()
    log.verbose('addType', addType)
    if(addType === ADD_TYPE_PROJECT) {
        const addName = name || await getAddName()
        log.verbose('addName', addName)
        const addTemplate = template || await getAddTemplate()
        log.verbose('addTemplate', addTemplate)
        const selectedTemplate = ADD_TEMPLATE.find(_ => _.value === addTemplate)
        log.verbose('selectedTemplate', selectedTemplate)
        // 获取最新版本号
        const latestVersion = await getLatestVersion(selectedTemplate.npmName)
        log.verbose('latestVersion', latestVersion);
        selectedTemplate.version = latestVersion;
        const targetPath = makeTargetPath()
        return {
            type: addType,
            name: addName,
            template: selectedTemplate,
            targetPath
        }
    }
}

export default createTemplate