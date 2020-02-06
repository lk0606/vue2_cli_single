
const RawSource = require('webpack-sources').RawSource
const path = require('path')
const JSZip = require('jszip')
const zip = new JSZip()

module.exports = class ZipPlugin {
    constructor(options) {
        this.options = options
    }

    apply(compiler) {
        console.log('ZipPlugin is executed!')
        console.log('ZipPlugin is options', this.options)

        compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback)=> {
            // console.log(compilation, 'compilation')

            const folder = zip.folder(this.options.filename)

            for(let filename in compilation.assets) {
                const source = compilation.assets[filename].source()
                // console.log(source, 'source')

                folder.file(filename, source)
            }
            zip.generateAsync({
                type: 'nodebuffer'
            }).then(content=> {
                // const outputPath = path.join(
                //     compilation.options.output.path,
                //     this.options.filename + '.zip'
                // )
                // const outputRelativePath = path.relative(
                //     compilation.options.output.path,
                //     outputPath
                // )

                compilation.assets[this.options.filename + '.zip'] = new RawSource(content)
                callback()
            })
        })
    }
}
