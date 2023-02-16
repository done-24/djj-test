import GitServer from './gitServer.js'
import axios from 'axios'
import { execa } from 'execa'
import path from 'node:path'
import { pathExistsSync } from 'path-exists'

const BASE_URL = 'https://api.github.com/'

class Github extends GitServer {
    constructor() {
        super()
        this.init()
    }

    init() {
        this.service = axios.create({
            baseURL: BASE_URL,
            timeout: 5000
        })
        this.service.interceptors.request.use(
            config => {
                config.headers['Authorization'] = `Bearer ${this.token}`
                config.headers['Accept'] = 'application/vnd.github+json'
                config.headers['X-GitHub-Api-Version'] = '2022-11-28'
                return config
            },
            error => Promise.reject(error)
        )
        this.service.interceptors.response.use(
            response => response.data,
            error => Promise.reject(error)
        )
    }

    get(url, params, headers) {
        return this.service({
            url,
            params,
            headers,
            method: 'get'
        })
    }

    post() {}

    searchRep(params) {
        return this.get('/search/repositories', params)
    }

    searchTag(fullName) {
        return this.get(`/repos/${fullName}/tags`)
    }

    getRepoUrl(fullName) {
        return `https://github.com/${fullName}.git`
    }

    cloneRepo(fullName, tag) {
        if(tag) {
            return execa('git', ['clone', this.getRepoUrl(fullName), '-b', tag])
        } else {
            return execa('git', ['clone', this.getRepoUrl(fullName)])
        }
    }

    installDep(cwd, fullName) {
        const projectName = fullName.split('/')[1]

        const projectPath = path.resolve(cwd, projectName)
        if(pathExistsSync(projectPath)) {
            return execa('npm', ['install'], { cwd: projectPath })
        }
        return null
    }
}

export default Github