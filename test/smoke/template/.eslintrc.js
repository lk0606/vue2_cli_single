module.exports = {
    parser: "babel-eslint",
    // extends: "airbnb",
    env: {
        browser: true,
        node: true,// 一些全局变量不会被报错 module require ...
        es6: true,
    },
    rules: {
        // indent: ["error", 4]
    }
}
