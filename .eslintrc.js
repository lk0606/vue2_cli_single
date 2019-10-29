module.exports = {
    "parser": "esprima",
    "rules": {
        "semi": "error"
    },
    "env": {
        "browser": true,
        "node": true,// 一些全局变量不会被报错 module require ...
        // "es6": true,
    }
}
