import {homedir} from 'node:os'
import path from 'node:path'
import fs from 'node:fs'
import { pathExistsSync } from 'path-exists'
import fse from 'fs-extra'
import inquirer from 'inquirer'

const TEMP_HOME = '.djj'
const TEMP_TOKEN = '.token'

function createTokenPath() {
    return path.resolve(homedir(), TEMP_HOME, TEMP_TOKEN)
}

function createTokenDir() {
    return path.resolve(homedir(), TEMP_HOME)
}

class GitServer {
    constructor() {
        this.check()
    }

    async check() {
        const tokenPath = createTokenPath()
        if (pathExistsSync(tokenPath)) {
            this.token = fse.readFileSync(tokenPath).toString()
        } else {
            this.token = await this.getToken()
            fs.writeFileSync(tokenPath, this.token)
        }
    }

    async getToken() {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'token',
                message: '请输入token'
            }
        ])
        return answers.token
    }
}

export default GitServer