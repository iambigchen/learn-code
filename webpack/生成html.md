#### HtmlWebpackPlugin

```js
new HtmlWebpackPlugin({
  filename: 'index.html', //指定文件名
  template: './index.html', //模板文件
  inject： false, // 为false时不把生成的css js插入模板中。
  minify: {
    collapseWhitespace: true //压缩html的空格
  },
  chunks: ['app'] // 多entry时，需要指定HtmlWebpackPlugin的chunks.如果不指定，则有几个entry都会被注入该chunks中
})
// 如果output中如果配置了publicPath，则自动注入的js和css也会加上这个路径
```



#### html-loader

##### html引入图片

```js
{
  test: /\.html$/,
    use: [
      {
        loader: 'html-loader',
        options: {
          attrs: ['img:src', 'img:data-src']
        }
      }
    ]
}
// 这里html打包出来的图片，会和css打包出来的图片不在同一个目录下，要想在同一个目录下，就必须将url-loader中的publicPath， retina删除， 并指定绝对路径outputPath指到html打包后图片的目录中。但是这样，css中的图片都会显示不出来。因为css的打包后文件位置和html的位置肯定不同，所以想显示出来，就需要将output的pu blicPath:'/',但是这样必须在起服务下才能访问到绝对路径的图片
```



#### html-webpack-inline-chunk-plugin

将提取出来的公共代码，提前引入到html中