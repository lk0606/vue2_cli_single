
/**
 * @desc 转化代码
 * 解析 AST 语法树，同时再将 AST 转化为 JS 代码 ES6 转化为 ES5 代码
 */

const fs = require('fs')
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const { transformFromAst } = require('babel-core')

module.exports = {
    getAST(path) {
        const source = fs.readFileSync(path, 'utf-8')
        return babylon.parse(source, {
            sourceType: 'module'
        })
    },
    getDependencies(ast) {
        let dependencies = []
        traverse(ast, {
            ImportDeclaration({ node }) {
                dependencies.push(node.source.value)
            }
        })
        return dependencies
    },
    transform(ast) {
        const {code} = transformFromAst(ast, null, {
            presets: ['env']
        })
        return code
    }
}
