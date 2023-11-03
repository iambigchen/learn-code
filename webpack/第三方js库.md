#### 引入cdn库

### 本地项目库



##### 1.webpack.providePlugin

```js
// nodeModules有jq
plugins: [
  new webpack.ProvidePlugin({
     $: 'jquery' //会直接去找nodeModules中找这jquery模块，全局项目都能用$了
  })
]

// 本地项目下载了jq
resolve: {
    alias: {// jquery 别名，告诉webpack jquery =src/libs/jquery.min.js
        jquery$: path.resolve(__dirname,'src/libs/jquery.min.js')
     }
}
// jquery$中的$符合是告诉webpack去精确匹配到某个文件，而不是目录。再配合ProvidePlugin插件，就可以全局使用$了
```



##### 2.imports-loader

```js
{ 
  test: path.resolve(__dirname, 'src/app.js'), //指定到入口文件
    use: [
      {   
        // 使用 imports-loader 注入
        loader: 'imports-loader',
        options: {
          $: 'jquery' //这里会解析应该从nodeModules中拿还是从resolve/alias中拿。这样配置就不需要ProvidePlugin插件了
        }
      }
    ]
}
```















#### 

