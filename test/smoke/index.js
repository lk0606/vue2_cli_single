const path = require('path')
const webpack = require('webpack')

const rimraf = require('rimraf')

process.chdir(path.join(__dirname, 'template'))

rimraf('./dist', ()=> {
    const prodConfig = require('../../build/webpack.prod1.js')

    webpack(prodConfig, (err, stats)=> {
        if(err) {
            console.error(err)
            process.exit(2)
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false
        }))
    })
})
