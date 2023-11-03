```js
function A(){
  
}

var a = new A()
```



js执行new后，到底做了什么？



以下手动实现一个new方法

```js
function N(Fn){
  var o = new Object()
  o.__proto__ = Fn.prototype
  var result = Fn.call(o)
  return typeof result === 'object'? result : o;
}
```



第一步： 先创建一个对象o

第二步： 将函数Fn的原型指向该对象o的`__proto__`上

第三步： 以o为执行环境，执行F n函数

第四步： 判断Fn的执行结果是否是object，如果是，就返回该对象，不是，则返回o

