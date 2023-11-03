#### style-loader

创建style标签

Style-loader/url

Style-loader/useable

```js
var path = require('path')

module.exports = {
  entry: {
    'app': './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  }
}
```

如果想把css打包到css文件，用link引入则用一下配置(style-loader从0.20.3之后版本，就没有style-loader/url了)

```js
var path = require('path')

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
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader/url'
          },
          {
            loader: 'file-loader'
          }
        ],
        exclude: ['/node_modules/', '/dist/']
      }
    ]
  }
}
```

Style-loader/useable是是否使用该css

```js
var path = require('path')

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
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader/useable'
          },
          {
            loader: 'css-loader'
          }
        ],
        exclude: ['/node_modules/', '/dist/']
      }
    ]
  }
}

// js中引入css，就有了use和unuse的方法
import base from './css/base.css'

var flag = true
setInterval(() => {
  if (flag) {
    base.use()
  } else {
    base.unuse()
  }
  flag = !flag
}, 5000)
```



> Style-loader配置

```js
insertAt 插入位置
insertInto 插入到dom
singleton	是否只使用一个style标签
transform 转化，浏览器环境下，插入页面前(指向一个js路径，js文件所做的就是把css进行转化，执行时机是在浏览器端，把css文件放到style标签时执行。这个js会对每个css文件都执行一次)


var path = require('path')

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
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insertInto: '#app',
              singleton: true,
              transform: './css.transform.js'
            }
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  }
}
```







#### css-loader

```js
配置有：
 	alias        解析别名
  importLoader @import
  minimize     是否压缩 // 已经删除，在最新版本中
  modules	     启用css-modules

var path = require('path')

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
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: true,
              transform: './css.transform.js'
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
}
// app.js
import base from  './css/base.css'
// import common from './css/common.css'

var app = document.querySelector('#app')

app.innerHTML = '<div class="'+ base.box +'">2222</div>'
// css
body{
  color: red
}

.box{
  color: yellow;
  composes: bigBox from './common.css'
}
// composes引入的css会先加入style标签中，所以要注意顺序
```



> Css-modules

```js
:local 本地样式 局部样式
:global 全局样式
compose 继承样式
composes ...from path  从某个路径引入样式
```



#### less

```js
module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: true,
              transform: './css.transform.js'
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      }
    ]
  }
```



### 提取css

#### 1.extract-text-webpack-plugin

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
          fallback: { // fallback是提取失败，执行的方法
            loader: 'style-loader',
            options: {
              singleton: true,
              transform: './css.transform.js'
            }
          },
          use: [ { // 提取成功后执行方法
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'less-loader'
          }]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin({
      filename: '[name].min.css', 
      allChunks: false // 默认是false，表示指提取一下初始化的css，动态加载的css不会提取，而是会加载到js文件中
    })
  ]
}
// 因为提取成了一个单独的css，所以还得手动link该css文件
```

