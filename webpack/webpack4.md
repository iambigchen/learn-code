#### mode

production

development

none

####零配置



#### optimization

​	1.optimization.minimize 压缩

​	2.UglifyJs-webpack-plugin



```js
optimization.minimizer: {
​					new UglifyJs({
​						ugilifyoptions: {
							ecma: 6,
  						cache: true,
  						parallel: true
​						}
​					})
​	}
```

 3. tree shaking在production,或者开启minimize时，自动开启了。但是需要在bable的presets.modules置为false，才生效

 4. runtimeChunk提取

    ​	optimization.runtimeChunk = true



#### 代码分割

​	optimization.splitChunks

​		name: true

​		minSize: 0

​		cacheGroups: {

​			preact: {

​				test: /(preact)|(loadsh)/,

​				chunks: 'initial'

​			}

​		} //第三方库

​			

#### mode:production splitChunks规则

新的chunk是被共同依赖的，或是从node_modules中来的

新的chunk大于30kb

在按需加载时候，最大的并行下载chunk数量应该小于等于5

在首屏加载的时候，最小的并行下载chunk的数量应该小于等于3