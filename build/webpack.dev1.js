'use strict';

const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const webpack = require('webpack')
const processEnv = require('../config/dev.env')

const devConfig = {
    watch: false,
    watchOptions: {
        // 默认为空 支持正则，不监听
        ignored: /node_modules/,
        // aggregateTimeout ms 后执行  默认300ms
        // aggregateTimeout: 300,
        // // 轮询是否发生变化 默认每秒1000次 也就是1ms/次
        // poll: 1000,
    },
    mode: 'development',
    module: {
        rules: []
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': processEnv
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        // open: false,
        // contentBase: '../dist',
        hot: true,
    },
    devtool: "source-map",
}

module.exports = merge(baseConfig, devConfig)
