import Github from "./github.js";

const github = new Github()

const vue = await github.search({
    q: 'vue',
    sort: 'stars',
    page: 1,
    per_page: 2
})
console.log(vue)