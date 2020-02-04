
            (function(modules) {
                function require(filename) {
                    console.log(filename, modules, 'filename')
                    const fn = modules[filename]
                    const module = { exports: {} }
                    
                    fn(require, module, module.exports)
                
                    return module.exports
                }
                require( '/Users/lk-mbp/Documents/git/study/webpack_study/simple-webpack/src/index.js' )
                
            })({ '/Users/lk-mbp/Documents/git/study/webpack_study/simple-webpack/src/index.js': function (require, module, exports) { "use strict";

var _greeting = require("./greeting.js");

document.write((0, _greeting.greeting)('lk'));

var flat1 = [1, [2, 3]].flat();
console.log(flat1); },'./greeting.js': function (require, module, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greeting = greeting;
function greeting(name) {
  return 'hello:' + name;
} }, })
        