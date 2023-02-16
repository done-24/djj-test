import ora from "ora";
import Github from "./github.js";

const github = new Github()

const repList = await github.searchRep({
    q: 'ora',
    sort: 'stars',
    page: 1,
    per_page: 2
})

const fullName = repList.items[0].full_name
const tags = await github.searchTag(repList.items[0].full_name)
const tag = tags[0].name

const spinner = ora('start clone...').start()
await github.cloneRepo(fullName, tag)
spinner.text = 'start install...'
await github.installDep(process.cwd(), fullName)
spinner.stop()
