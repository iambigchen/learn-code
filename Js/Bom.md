```js
var age = 1
window.namea = 'a'
两者区别？
能否用delete删除
delete window.age // false
delete window.namea //true

window.age // 1
window.namea // undefined

var age 添加的window属性中有一个Configura的特性，该特性被设置为false
```



####窗口位置

> window.screenTop || window.screenY 浏览器距离屏幕顶部距离



> window.screenLeft || window.screenX 浏览器距离屏幕左侧距离



兼容写法

```js
typeof window.screenLeft == 'number' ? window.srceenLeft : window.screenX

typeof window.screenTop == 'number' ? window.screenTop : window.screenY
```





#### 窗口大小

> window.innerWidth 窗口宽，不加边框和控制台等



> window.innerHeight 窗口高，不加边框和控制台等



> window.outerWidth 窗口宽



> window.outerHeight 窗口高



> document.body.clientWidth == window.innerWidth 
>
> (标准模式为document.documentElement.clientWidth)



> document.documentElement.clientHeight == window.innerHeight
>
> (标准模式为document.documentElement.clientWidth)





#### window.open

```js
 var wroxWin = window.open('http://www.abx.com', '_blank')
 wroxWin.opener == window
 wroxWin.close()
```





#### 弹出窗口是否被屏蔽

被屏蔽了可能是返回null，也有可能报错

```js
var blocked = false
try {
  var wroxWin = window.open('http://www.abx.com', '_blank')
  if (wroxWin == null) {
    blocked = true
  }
} catch (err) {
  blocked = true
}
if (blocked) {
  alert()
}
```



#### location

location即是window对象下的属性，也是document对象下的属性

window.location == document.location

>  location.hash     #abc  url中的hash值



>  location.host.     www.baidu.com:8888 服务器名称和端口号

 

>  location.hostname  www.baidu.com 服务器名称



>  location.href.   完整的url



> Location.pathname 返回URL中的目录或文件名



> Location.port     端口号



> Location.protocol.     http或者https



> Location.search.     ?q=javascript返回URL的查询字符串

 

```js
location.assign('http://www.baidu.com')

以下两种方法，调用的其实是location.assign
window.location = 'http://www.baidu.com'
location.href = 'http://www.baidu.com'


location.replace('http://www.baidu.com')


location.reload() // 重新加载（有可能从缓存中加载）
location.reload(true) // 重新加载（从服务器中加载）
```

