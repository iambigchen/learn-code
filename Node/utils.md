#### 将对象序列化为字符串util.inspect

```js
util.inspect(util, { showHidden: true, depth: null })
```



#### 实现对象间原型继承：util.inherits

```js
//复制父对象上所有的方法
util.inherits(MyStream, events.EventEmitter);

//对MyStream类添加原型方法
MyStream.prototype.write = function(data) {
    this.emit("data", data);
}
```

