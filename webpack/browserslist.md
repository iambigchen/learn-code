因为postcss和babel都需要用到browserslist，所以会写一个公共的browserslist，放到package.json 或者 .borwserslistrc

```js
{
  "name": "css",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "autoprefixer": "^9.6.1",
    "css-loader": "^3.2.0",
    "cssnano": "^4.1.10",
    "extract-text-webpack-plugin": "^3.0.2",
    "file-loader": "^4.2.0",
    "less": "^3.10.3",
    "less-loader": "^5.0.0",
    "postcss": "^7.0.17",
    "postcss-cssnext": "^3.1.0",
    "postcss-loader": "^3.0.0",
    "sass-loader": "^8.0.0",
    "style-loader": "^0.20.3",
    "webpack": "^3.12.0"
  },
  "browserslist": [
    ">= 1%"
  ]
}

```

