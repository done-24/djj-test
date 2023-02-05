import inquirer from 'inquirer'

inquirer
  .prompt([
    {
        type: 'input',
        name: 'yourName',
        message: 'input your name',
        default: 'yuanj',
        validate: v => v.indexOf('yuan') !== -1,
        transformer: v => `this is your input name: ${v}`,
        filter: v => `${name}` // 会改变结果
    }
  ])
  .then((answers) => {
    console.log(answers)
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });