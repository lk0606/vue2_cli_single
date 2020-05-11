'use strict';

const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasureWebpackPlugin()

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const processEnv = require('../config/prod.env')

const prodConfig = {
    mode: 'production', // production 默认开启 tree-shaking
    resolve: {
        alias: {
            'react': path.resolve(__dirname, '../node_modules/react'),
            'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
        },
        modules: [ path.resolve(__dirname, '../node_modules')],
        extensions: ['.js'],
        mainFields: ['index']
    },
    module: {
        rules: []
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': processEnv
        }),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        // 压缩
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano') // 预处理器
        }),
        // 基础库分离 cdn
        // new HtmlWebpackExternalsPlugin({
        //     externals: [
        //         {
        //             module: 'react',
        //             entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
        //             global: 'React',
        //         },
        //         {
        //             module: 'react-dom',
        //             entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
        //             global: 'ReactDom',
        //         },
        //     ],
        // }),
        // scope Hoisting webpack 4 production 下默认开启
        // new webpack.optimize.ModuleConcatenationPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new webpack.DllReferencePlugin({
            manifest: require('./library/library.json')
        }),

        // new BundleAnalyzerPlugin(),
        new HardSourceWebpackPlugin(),
        // 捕获错误
        function() {
            // webpack3
            // this.plugin('done', (stats) => {
            // webpack4
            // this === compiler
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1)
                {
                    console.log('build error');
                    // process.exit(1);
                }
            })
        }
    ],
    // webpack4 已内置
    optimization: {
        splitChunks: {
            minSize: 0, // 引用包大小
            cacheGroups: {
                commons: {
                    // test: /(react|react-dom)/,
                    // name: 'react-vendors',
                    name: 'commons',
                    chunks: "all",
                    minChunks: 2,
                }
            }
        }
    },
    devtool: "cheap-source-map",
}


module.exports = merge(baseConfig, prodConfig)
