

module.exports = class MyPlugin {
    constructor(options) {
        this.options = options
    }

    apply(compiler) {
        console.log('MyPlugin is executed!')
        console.log('MyPlugin is options', this.options)
    }
}
