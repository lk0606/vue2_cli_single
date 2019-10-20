'use strict';

const path = require('path');
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
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name]_[chunkhash:4].js'
	},
	mode: 'production',
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
                test: /.(png|jpe?g|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240
                    }
                },
            },
            {
                test: /.(woff2?|eot|ttf|otf)$/,
                use: 'file-loader',
            },
        ]
    }
}
