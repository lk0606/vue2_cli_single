'use strict';

const path = require('path');
const glob = require('glob')
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const tplHTML = path.join(__dirname, './public/index.html')


console.log(tplHTML, 'tplHTML')
console.log(`you are run on ${process.env.mode}...`)

function getEntry() {
    const entriesDir = glob.sync(path.join(__dirname, './src/*'))

    let entry = {}
    entriesDir.forEach(item=> {
        const entryName = item.slice(item.lastIndexOf('/')+1)
        entry[entryName] = item + '/' + entryName + '.js'
    })
    console.log(entry, 'entry')
    return entry
}

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
    entry: getEntry(),
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
		filename: '[name]_[chunkhash:8].js'
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
                    // 'style-loader', // 放入 head
                    MiniCssExtractPlugin.loader, // 打包为css文件，与style loader互斥
                    'css-loader'
                ],
            },
            {
                test: /.less$/,
                use: [
                    // 'style-loader', // 放入 head
                    MiniCssExtractPlugin.loader, // 打包为css文件，与style loader互斥
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: ()=> [
                                require('autoprefixer')({
                                    // Replace Autoprefixer browsers option to Browserslist config.
                                    // Use browserslist key in package.json or .browserslistrc file.
                                    // browsers: ['last 2 version', '>1%', 'ios 7']
                                })
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75, // 750
                            remPrecision: 8, // 小数点后为主
                        }
                    },
                    'less-loader',
                ],
            },
            // 以下使用 url-loader替换file-loader
            // 原因： url-loader基于file-loader 多了小字体自动转base64 limit来实现
            {
                test: /.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]'
                    }
                },
            },
            {
                test: /.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]'
                    }
                },
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        // 压缩
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano') // 预处理器
        }),
        // 一个页面对应一个
        new HtmlWebpackPlugin({
            // template: path.join(__dirname, 'src/index/index.html'),
            template: tplHTML,
            filename: 'index.html',
            // chunks主要用于多入口文件
            chunks: ['index'],
            /**
             *  注入选项。有四个选项值 true, body, head, false.
             *  true：默认值，script标签位于html文件的 body 底部
             *  body：script标签位于html文件的 body 底部（同 true）
             *  head：script 标签位于 head 标签内
             *  false：不插入生成的 js 文件，只是单纯的生成一个 html 文件
             */
            inject: true,
            minify: {
                html5: true,
                // preserveLineBreaks: false, // 未找到对应参数
                //是否对大小写敏感，默认false
                caseSensitive: true,

                //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled  默认false
                collapseBooleanAttributes: true,

                //是否去除空格，默认false
                collapseWhitespace: true,

                //是否压缩html里的css（使用clean-css进行的压缩） 默认值false；
                minifyCSS: true,

                //是否压缩html里的js（使用uglify-js进行的压缩）
                minifyJS: true,

                // Prevents the escaping of the values of attributes  防止转义属性值
                preventAttributesEscaping: true,

                //是否移除属性的引号 默认false
                removeAttributeQuotes: true,

                //是否移除注释 默认false
                removeComments: true,

                //从脚本和样式删除的注释 默认false
                removeCommentsFromCDATA: true,

                //是否删除空属性，默认false
                removeEmptyAttributes: true,

                //  若开启此项，生成的html中没有 body 和 head，html也未闭合
                removeOptionalTags: false,

                //删除多余的属性
                removeRedundantAttributes: true,

                //删除script的类型属性，在h5下面script的type默认值：text/javascript 默认值false
                removeScriptTypeAttributes: true,

                //删除style的类型属性， type="text/css" 同上
                removeStyleLinkTypeAttributes: true,

                //使用短的文档类型，默认false
                useShortDoctype: true,
            }

        }),
        new HtmlWebpackPlugin({
            // template: path.join(__dirname, 'src/search/search.html'),
            template: tplHTML,
            filename: 'search.html',
            // chunks主要用于多入口文件
            chunks: ['search'],
            /**
             *  注入选项。有四个选项值 true, body, head, false.
             *  true：默认值，script标签位于html文件的 body 底部
             *  body：script标签位于html文件的 body 底部（同 true）
             *  head：script 标签位于 head 标签内
             *  false：不插入生成的 js 文件，只是单纯的生成一个 html 文件
             */
            inject: true,
            minify: {
                html5: true,
                // preserveLineBreaks: false, // 未找到对应参数
                //是否对大小写敏感，默认false
                caseSensitive: true,

                //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled  默认false
                collapseBooleanAttributes: true,

                //是否去除空格，默认false
                collapseWhitespace: true,

                //是否压缩html里的css（使用clean-css进行的压缩） 默认值false；
                minifyCSS: true,

                //是否压缩html里的js（使用uglify-js进行的压缩）
                minifyJS: true,

                // Prevents the escaping of the values of attributes  防止转义属性值
                preventAttributesEscaping: true,

                //是否移除属性的引号 默认false
                removeAttributeQuotes: true,

                //是否移除注释 默认false
                removeComments: true,

                //从脚本和样式删除的注释 默认false
                removeCommentsFromCDATA: true,

                //是否删除空属性，默认false
                removeEmptyAttributes: true,

                //  若开启此项，生成的html中没有 body 和 head，html也未闭合
                removeOptionalTags: false,

                //删除多余的属性
                removeRedundantAttributes: true,

                //删除script的类型属性，在h5下面script的type默认值：text/javascript 默认值false
                removeScriptTypeAttributes: true,

                //删除style的类型属性， type="text/css" 同上
                removeStyleLinkTypeAttributes: true,

                //使用短的文档类型，默认false
                useShortDoctype: true,
            }

        }),
        new CleanWebpackPlugin(),
    ]
}
