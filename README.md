#### layout

1.高度已知三栏布局，左右各宽300px，中间自适应（5种实现方法）

2.5种方案各自的优缺点

浮动：缺点：脱离文档流了，需要清除浮动。 优点： 兼容性好

绝对定位：缺点：脱离文档流了，所以子元素也脱离文档流。优点：快捷

flex： 比较完美

3.高度未知情况，哪个方案不再适用了

4.5种方案兼容性如何



#### 盒模型

1.基本概念：标准模型+ie模型

2.标准模型和ie模型区别

3.css如何设置这俩种模型

4.js如何设置获取盒模型对应的宽和高 [吸顶.md](../滚动条/吸顶.md) 

```js
dom.style.width/height  //有局限性
dom.currentStyle.width/height //ie支持
window.getComputedStyle(dom).width/height // 通用性更好
dom.getBoundingClientRect().width/height
```



5.实例题（根据盒模型解释边距重叠）

6.BFC（边距重叠解决方案）

​	BFC基本概念

​	BFC原理（渲染规则）

​	如何创建BFC

​	使用场景



### dom事件

1.dom事件级别（dom0,dom2, dom3）

2.dom事件模型（冒泡，捕获）

3.dom事件流

​	浏览器与用户交互过程

​	三个阶段：捕获阶段，目标阶段，冒泡阶段

4.捕获具体流程 (冒泡具体流程)

​	window > document > html (document.element) > body > Dom

5.event常见应用

​	阻止默认行为

​	阻止冒泡行为

​	事件响应优先级

​	taget， currentTarget

6.自定义事件

​	

### http协议类（缓存，cors）

1.http协议主要特点

​	简单快速 灵活 无连接 无状态

2.http报文组成部分

​	请求报文： 请求行（http方法，地址，协议），请求头（host,。。。。 ），空行（请求头和请求体划分）， 请求体(data)

​	响应报文： 状态行(协议，状态码)，响应头，空行，请求体

3.http方法

​	get - 获取资源

​	post - 传输资源

​	put - 更新资源

​	delete - 删除资源

​	head - 获得报文首部

4.post和get区别

5.http状态码（200， 301， 302， 304（未修改）， 400， 401（未登录）， 403（重定向）， 404， 500， 503）

​	1xx： 指示信息， 表示请求已接受

​	2xx： 成功

​	3xx： 重定向

​	4xx： 客户端错误

​	5xx：服务器错误

6.什么是持久连接（http1.1才支持）

7.什么是管线化



#### 原型链

1.创建对象有几种方法

2.原型，构造函数，实例，原型链

3.instanceof原理

4.new运算符



#### 面向对象

1.类的声明

2.生成实例

3.如何实现继承

4.继承几种方式



#### 通信类

1.什么是同源策略及限制

2.前后端如何通信

​	ajax

​	websocket（不受同源策略限制）

​	cors

3.如何创建ajax

4.跨域通信几种方式



#### 安全

1.csrf

​	基本概念和缩写

​	攻击原理

​	防御措施

2.xss



#### 渲染机制

什么是doctype及作用

​	DTD

浏览器渲染过程

重排reflow

​	触发reflow

​			增加删除修改dom结点会导致reflow和repaint

​			移动dom

​			修改css

​			修改网页默认字体

​			resize窗口时有可能

重绘repaint

​		触发： dom改动和css改动（页面显示内容动了，就会触发）

​		如何减少repaint频率： createDocumentFragment [Dom-Node.md](../Js/Dom-Node.md) 

布局layout

#### js运行机制

​	

#### 页面性能

​	提升页面性能方法：

​		1.资源压缩，减少http请求

​		2.非核心代码异步加载- 异步加载方式- 异步加载的区别 [script.md](../Js/script.md) 

​				异步加载方式：

​					1.动态脚本加载

​					2.defer

​					3.async

​		3.利用浏览器缓存- 缓存分类- 缓存原理 [缓存.md](../xing-neng/缓存.md) 

​		4.使用cdn

​		5.预解析dns

​			`<meta http-....>` 作用是浏览器a标签默认开启了预解析的，但是https没有开，这个作用就是开这个

​			`<link ...>`

#### 错误监控 [错误处理.md](../Js/错误处理.md) 



####webpack



####mvc mvvm


####typeof

```js
 typeof null // object     js的一个bug
 typeof [] // object
 typeof console.log // function
```



####undefined  vs void 0

```js
// undefined 不是保留词，所以在低端浏览器下，可以被重写，高端浏览器的局部作用域下也可以
(function() {
  var undefined = 10;
  // 10 -- chrome
  alert(undefined);
})();
```



#### key in obj

```js
// 判断对象是否有某个key的方法是 'a' in obj 
// obj.a === undefined 不能准确判断，因为会存在以下情况
var obj = {
  a: undefined
}
```



#### 排序

```js
// 整数key会有排序，即以下情况
var obj = {
  '3': 3,
  '1': 1,
  '6': 6,
  '+6': 6, // +6不是整数属性
  '1.2': 1.2 // 1.2不是整数属性
}
// obj = {1: 1, 3: 3, 6: 6, +6: 6, 1.2: 1.2}
```

