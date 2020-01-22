
const shell = require('shelljs')
shell.rm('-rf', './build/library')

const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        library: [
            'react',
            'react-dom'
        ]
    },
    output: {
        filename: '[name]_[hash].dll.js',
        path: path.join(__dirname, './library'),
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: path.join(__dirname, './library/[name].json')
        })
    ]
};
