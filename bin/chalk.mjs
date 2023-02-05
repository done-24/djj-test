// import chalk from "chalk";
import ora, { oraPromise } from 'ora'

// console.log(chalk.red('hello chalk'))

// const spinner = ora()

// let process = 0;
// spinner.color = 'red'
// spinner.text = `Loading ${process}%`
// spinner.prefixText = 'Download ora'
// spinner.start();

// const task = setInterval(() => {
//     process += 10;
//     spinner.text = `Loading ${process}%`
//     if(process === 100) {
//         spinner.stop()
//         spinner.succeed('Download finish!')
//         clearInterval(task)
//     }
// }, 500)

(async function () {
    const promise = new Promise(resolve => {
        console.log('doing something');
        setTimeout(() => {
            resolve()
        }, 3000)
    })
    await oraPromise(promise, {
        successText: 'doing sunc',
        failText: 'doing fail'
    })
})()