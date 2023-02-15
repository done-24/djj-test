import GitServer from './gitServer.js'
import axios from 'axios'

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

    search(params) {
        return this.get('/search/repositories', params)
    }
}

export default Github