

const path = require('path')
const MyPlugin = require('./plugins/my-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.js'
    },
    mode: 'development',
    plugins: [
        new MyPlugin({
            name: 'MyPlugin'
        })
    ]
}
