
const loaderUtils = require('loader-utils')

module.exports = function (source = 'loader a') {
    console.log('Loader a is executed!')

    const url = loaderUtils.interpolateName(this, '[name].[ext]', source)
    console.log(url)

    this.emitFile(url, source)
    return source
}
