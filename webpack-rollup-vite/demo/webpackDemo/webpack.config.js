const path = require('path')
const HtmlWebpackPlugin  = require("html-webpack-plugin")

module.exports = {
    entry: './index.js',
    mode: 'development',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: true,//删除空格、换行
            },
        }),
    ]
}