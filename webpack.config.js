
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: 'none',
    entry: {
        'int-add': './src/index.js',
        'int-add.min': './src/index.js'
    },
    output: {
        filename: '[name].js', // [name] 占位符
        library: 'intAdd', // package name
        libraryTarget: 'umd', // script cjs amd es module 引用
        libraryExport: 'default' // 调用不需要 xxx.default
    },
    optimization: {
        minimize: true,
        minimizer: [
            // 比 ugly...好，避免es6+语法报错   webpack4默认开启? 基于 uglify.js 改造
            new TerserPlugin({
                include: /\.min\.js$/
            })
        ]
    }
}