
const path = require('path')
const fs = require('fs')
const SpriteSmith = require('spritesmith')
const loaderUtils = require('loader-utils')

module.exports = function (source) {
    // console.log(source, 'source')

    const callback = this.async()
    const _this = this

    const images = source.match(/url\((\S+)\?__sprite/g)
    // console.log(images, 'images')

    let matchImages = []

    if(Array.isArray(images) && images.length>0) {
        images.forEach(image=> {

            const imagePath = image.match(/url\(['"]*(\S+)\?__sprite/)[1]
            console.log(imagePath, 'imagePath')
            matchImages.push(path.join(__dirname, imagePath))
        })

        // console.log(matchImages, 'matchImages')

        SpriteSmith.run({src: matchImages}, (err, result)=> {
            // result.image; // Buffer representation of image
            // result.coordinates; // Object mapping filename to {x, y, width, height} of image
            // result.properties; // Object with metadata about spritesheet {width, height}
            // console.log(err, result)

            fs.writeFileSync(path.join(process.cwd(), './dist/sprite.png'), result.image)
            // const imageUrl = loaderUtils.interpolateName(this, '[name].[ext]', result.image)
            // _this.emitFile(imageUrl, source)

            source = source.replace(/url\((\S+)\?__sprite/g, match=> {
                // console.log(match, 'match')
                return `url("./sprite.png`
            })
            // console.log(source, 'source')
            fs.writeFileSync(path.join(process.cwd(), './dist/index.css'), source)
            // const cssUrl = loaderUtils.interpolateName(this, '[name].[ext]', source)
            // _this.emitFile(cssUrl, source)

            callback(null, source)
        });
    }
}
