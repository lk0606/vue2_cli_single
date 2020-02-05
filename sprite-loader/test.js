
const fs = require('fs')
const path = require('path')
const SpriteSmith = require('spritesmith')

// Generate our spritesheet
// const sprites = ['./loaders/images/fork.png', './loaders/images/github.png', './loaders/images/twitter.png']
const sprites = ['./loaders/images/fork.png', './loaders/images/github.png', './loaders/images/twitter.png']

SpriteSmith.run({src: sprites}, (err, result)=> {
    // result.image; // Buffer representation of image
    // result.coordinates; // Object mapping filename to {x, y, width, height} of image
    // result.properties; // Object with metadata about spritesheet {width, height}
    console.log(err, result)
    fs.writeFileSync(path.join(__dirname, './dist/sprite.png'), result.image)
});
