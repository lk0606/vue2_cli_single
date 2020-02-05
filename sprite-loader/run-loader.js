
const path = require('path')
const fs = require('fs')

const { runLoaders } = require('loader-runner')
runLoaders({
    resource: path.join(__dirname, './loaders/index.css'),
    loaders: [
        {
            loader: path.join(__dirname, './loaders/sprite-loader.js'),
            options: {
                name: 'test'
            }
        }
    ],
    context: {
        minmize: true // 是否压缩
    },
    readResource: fs.readFile.bind(fs)
}, (err, result)=> {
    err ? console.log(err, 'err') : console.log(result, 'result')
})
