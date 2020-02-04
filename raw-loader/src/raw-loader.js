
const path = require('path')
const fs = require('fs')
const loaderUtils = require('loader-utils')

module.exports = function (source) {
    const options = loaderUtils.getOptions(this)
    console.log(options, 'options')

    // this.cacheable = false

    const json = JSON.stringify(source)
        // .replace('foo', '')
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029')

    let callback = this.async()
    // 同步回调
    // this.callback(null, json, 1, 2)

    // 异步
    fs.readFile(path.join(__dirname, './async.txt'), 'utf-8', (err, data)=> {
        if(err) {
            callback(new Error('async error'), '')
        } else {
            callback(null, data)
        }
    })

    // return `export default ${ json }`
}
