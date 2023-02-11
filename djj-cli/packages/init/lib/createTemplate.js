import { log, makeList, makeInput } from "@djj/utils"
const ADD_TYPE_PROJECT = 'project'
const ADD_TYPE_PAGE = 'page'
const ADD_TEMPLATE = [
    {
        name: 'vue',
        npmName: 'template_vue',
        value: 'template_vue',
        version: '1.0.0'
    },
    {
        name: 'react',
        npmName: 'template_react',
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
        defaultValue: ''
    })
}

function getAddTemplate() {
    return makeList({
        choices: ADD_TEMPLATE,
        message: '请选择项目模版'
    })
}

async function createTemplate(name, ops) {
    // 获取创建类型
    const addType = await getAddType()
    log.verbose('addType', addType)
    if(addType === ADD_TYPE_PROJECT) {
        const addName = await getAddName()
        log.verbose('addName', addName)
        const addTemplate = await getAddTemplate()
        log.verbose('addTemplate', addTemplate)
        const selectedTemplate = ADD_TEMPLATE.find(_ => _.value === addTemplate)
        log.verbose('selectedTemplate', selectedTemplate)
        // 获取最新版本号
        return {
            type: addType,
            name: addName,
            template: selectedTemplate
        }
    }
}

export default createTemplate