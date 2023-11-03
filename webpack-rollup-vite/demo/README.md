## rollup

### rollup 定义

Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码。Rollup 对代码模块使用新的标准化格式，这些标准都包含在 JavaScript 的 ES6 版本中，而不是以前的特殊解决方案，如 CommonJS 和 AMD。ES6 模块可以使你自由、无缝地使用你最喜爱的 library 中那些最有用独立函数，而你的项目不必携带其他未使用的代码。ES6 模块最终还是要由浏览器原生实现，但当前 Rollup 可以使你提前体验。

### rollup 使用

1. 安装`npm i rollup --save`

2. 指定配置文件 `rollup -c rollup.config.js` (和`webpack`不同，`rollup` 不会自动去找根目录下的配置文件)

3. 配置`rollup`

```js
// rollup.config.js
export default {
    input: 'index.js', // 指定入口文件
    output: {
        dir: 'dist', // 指定打包目录
        name: 'index', // 打包格式为iife和umd时，挂载在全局的名称 其他打包格式可不写
        format: 'esm' // 指定输出格式 其他格式有： amd、cjs、iife、esm、umd、system
    }
}
```

4. 对`CommonJS`的包引入 `@rollup/plugin-commonjs`

 `rollup`默认只会处理 ES6 模块的包引入，但很多`npm`包是用`CommonJS`格式暴露出对象的。这里需要用到`rollup` 的一个插件，`@rollup/plugin-commonjs`

 ```js
    import commonjs from '@rollup/plugin-commonjs'
    export default {
        input: 'index.js',
        output: {
            dir: 'dist',
            name: 'index', 
            format: 'esm'
        },
        plugins: [
            commonjs()
        ]
    }
 ```

 5. `babel`的使用  `rollup-plugin-babel`
 ```js
 import commonjs from '@rollup/plugin-commonjs'
 import babel from 'rollup-plugin-babel'

 export default {
    input: 'index.js',
    output: {
        dir: 'dist',
        name: 'index',
        format: 'iife' 
    },
    plugins: [
        babel({
            exclude: 'node_modules/**' 
        }),
        commonjs()
    ]
 }
 ```

__打包成`iife`、 `umd`格式的代码时，需要注意`@babel/plugin-transform-runtime` 的使用__


 ### 特点

 1. 对`es6`的`import`支持程度很好,不会引入额外的代码。很适合于打包`js`插件库的开发。

 2. 没有`webpack`的`loader`、模块热替换。所以对于项目的开发`webpack`更加适合。

## vite

### vite 使用

 `npm init vite-app <project-name>`

### 浏览器原生的 ESM

 1. `<script>` 标签加 `type="module"`，可支持 `import`

 2. 不支持本地文件协议，直接在浏览器打开本地`html` 是不生效的

 3. `type="module"` 自带 `defer` 属性

 4. 内联`js`忽略`defer` 和 `async`，只有外链`js`才会生效 

### 对请求的拦截

 1. `vite`会起一个本地的服务，用于拦截所有的请求，来判断请求的内容

 2. 如果是`node_modules`里的模块，会替换成`@modules/**` ，拦截到`@modules`,就会去`node_modules`目录查询相对应的文件目录下的`package.json`，并找到`package.json.module`的值，从而找到入口文件。

 3. 对`.vue`文件的解析，是先解析出`script`部分，再加上请求`template`和`css`的`import`语句