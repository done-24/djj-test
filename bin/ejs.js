const ejs = require('ejs')

const html = '<div><%= user.name %></div>'
const options = {}
const data = {
    user: {
        name: '木木'
    }
}

const template = ejs.compile(html, options)

const compiledTem = template(data)
console.log(compiledTem) // <div>木木</div>

const renderedTem = ejs.render(html, data, options)
console.log(renderedTem) // <div>木木</div>