'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    watch: false,
    watchOptions: {
        // 默认为空 支持正则，不监听
        ignored: /node_modules/,
        // aggregateTimeout ms 后执行  默认300ms
        aggregateTimeout: 300,
        // 轮询是否发生变化 默认每秒1000次 也就是1ms/次
        poll: 1000,
    },
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    /**
     * 文件指纹 [name][(hash|chunkhash|contenthash)].[ext]
     * name entry name
     * hash 一个文件修改，则整个项目构建的hash值也将更改
     * chunkhash 和webpack打包的chunk有关，根据entry生成不同chunkhash
     * contenthash 根据文件内容生成hash，内容不变，则contenthash不变
     * ext 文件后缀
     */
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js'
	},
	mode: 'development',
    module: {
	    rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
            // 以下使用 url-loader替换file-loader
            // 原因： url-loader基于file-loader 多了小字体自动转base64 limit来实现
            {
                test: /.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240
                    }
                },
            },
            {
                test: /.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: 'file-loader',
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        // open: false,
        contentBase: './dist',
        hot: true
    }
}
