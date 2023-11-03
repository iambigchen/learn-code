#### webpack
webpack致力于复杂SPA的模块化构建,优势有
1. 通过loader处理各种各样的资源依赖
2. 模块热替换
3. 按需加载
4. 提取公共模块

#### rollup
1. 对于ES模块依赖库，rollup会静态分析代码中的 import，并将排除任何未实际使用的代码