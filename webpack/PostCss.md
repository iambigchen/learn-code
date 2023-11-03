postcss是在编译时，将css通过js改变



#### Autoprefixer

加前缀

#### css-nano 

css压缩



### css-next

使用新语法



```js
var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    'app': './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              singleton: true,
              transform: './css.transform.js'
            }
          },
          use: [ {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss', // 表明接下来的插件是给postcss使用
              plugins: [
                require('postcss-cssnext')() // postcss-cssnext包含了autoprefixer，所以不用添加两个
              ]
            }
          },
          {
            loader: 'less-loader'
          }
        ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin({
      filename: '[name].min.css',
      allChunks: false
    })
  ]
}

```



#### postcss-import

