
if(process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/int-add.min.js')
} else if (process.env.NODE_ENV === 'development') {
    module.exports = require('./dist/int-add.js')
}