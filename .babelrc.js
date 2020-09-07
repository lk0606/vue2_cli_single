module.exports = {
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    "plugins": [
        "@babel/plugin-syntax-dynamic-import",
        [
            "component", {
                "libraryName": "@wont/react-ui",
                "libDir": "lib",
                "style": "index.less"
            }
        ],
        // ["import", {
        //     "libraryName": "@wont/react-ui",
        //     "libraryDirectory": "lib",
        //     // style: name => name,
        //     customName: "@wont/react-ui/lib/button/index.css",
        // }, "@wont/react-ui"]
    ]
}
