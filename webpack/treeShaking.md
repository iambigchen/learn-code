#### js tree shaking

Webpack.optimize.uglifyjs

```js
plugins: [
    new webpack.optimize.UglifyJsPlugin()
]
```

lodash使用UglifyJsPlugin去treeshaking时，效果不大。需要引入babel-plugin-lodash这个插件来treeshaking

```js
{
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: ['lodash']
          }
        }]
      }
```





#### css tree shaking

Purify css（使用的是purifycss-webpack）

```js
options: {
  path: glob.sync([]) // 路径 需要先安装glob-all  
}
```





