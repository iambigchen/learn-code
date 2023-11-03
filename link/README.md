#### ref 
1. preload 预加载，除了该文件外，文件内的资源也会被预加载
```js
<link rel="preload" href="./index.js" as="script"> 
```
上面代码，执行提取加载了index.js。但是不会执行内部代码

2. prefetch 为下个页面做准备，所以他的权重会被之后，而preload是为当前页面准备，所以他的权重会加大
```js
  <link rel="prefetch" href="./index3.js" as="script">  
  <link rel="stylesheet" href="./blue.css" media="(min-width:1001px)">
  <link rel="stylesheet" href="./red.css" media="(max-width:1000px)">
  <link rel="preload" href="./index2.js" as="script">
  <link rel="preload" href="./index.js" as="style">
```
会先加载index2,index,如果屏幕宽大于1000则先加载blue，在加载index3，最后才是red。如果屏幕宽小于1000，则red和blue顺序相反

3. prefetch 和srcipt加载同一个js，会加载两次，但是preload则只会加载一次
#### as 指定将要预加载的内容的类型
audio, document, font, imgage, script, style, video

#### type 
- type表示预加载资源的MIME类型，浏览器将根据type属性来判断它是否支持这一资源，若支持，则会下载，否则便忽略。
- as属性只是用来表示资源优先级的，而type才是标记资源类型的，所以当为了更高优先级，我们可以这么写：
```js
<link rel="preload" href="./js/1.js" as="style" />
```

#### media
- 媒体查询