#### 数据属性
1. configurable
2. enumerable
3. writable
4. vaule

#### 访问器属性
1. configurable
2. enumerable
3. set
4. get

#### get, set 和 writable， vaule不能同时定义

#### Object.defineProperties， Object.defineProperty
1. Object.defineProperty 一次定义一个属性的数据属性或访问器属性
```js
Object.defineProperty(obj, 'name', {
  configurable: true,
  enumerable: true,
  get: function() {
    return this._name
  },
  set: function(val) {
    this._name = val
  }
})
```
2. Object.defineProperties 一次定义多个属性的数据属性或访问器属性
```js
Object.defineProperties(obj, {
  'name': {
    enumerable: true,
    configurable: true,
    get: function() {
      return this._name
    },
    set: function(val) {
      this._name = val
    }
  },
  'name2': {
    value: 'aaaa',
    writable: true,
    enumerable: true,
    configurable: true
  }
})
```

#### Object.getOwnPropertyDescriptor 取得给定属性的描述符
```js
console.log(Object.getOwnPropertyDescriptor(obj, 'name'))
console.log(Object.getOwnPropertyDescriptor(obj, 'name2'))
```

#### 原型链继承
```js
function Super () {
  this.arr = []
}
function Sub () {

}

Sub.prototype = new Super()

var sup = new Super()
var sub = new Sub()
var sub2 = new Sub()
```
问题：
1. Sub的构造函数指向了Super
2. 没法给Sub单独传参数
3. sub, sub2 共同指向了同一个arr

#### 借用构造函数
```js
function Super () {
  this.arr = []
}
Super.prototype.say = function() {
  console.log('say');
}
function Sub () {
  Super.call(this)
}
var sup = new Super()
var sub = new Sub()
```
问题：
1. 这么写的确解决了构造函数问题，和传参问题，但是所有需要继承的方法或属性，都必须在Super函数内部定义，否则就没法继承

#### 结合上面两个方法，组合继承
```js
function Super() {
  this.arr = []
}
Super.prototype.say = function(){
  console.log('say');
}
function Sub() {
  Super.call(this)
}
Sub.prototype = new Super()
```
问题；
1. 构造函数问题依然存在
2. Super构造函数调用了两次

#### 寄生组合继承
```js
function Super() {
  this.arr = []
}
Super.prototype.say = function(){
  console.log('say');
}
function Sub() {
  Super.call(this)
}
Sub.prototype = Object.create(Super.prototype)
Sub.prototype.constructor = Sub
var sup = new Super()
var sub = new Sub()
```
问题：
1. 通过Object.create解决了构造函数调用两次问题，但是仍然有构造函数指向问题
2. 通过Sub.prototype.constructor = Sub ，即可解决构造函数指向问题

#### Object.create()
```js
function Cr(obj) {
  let o = new Object()
  o.__proto__ = obj
  const args = [...arguments]
  var otherObj = args[1]
  if (otherObj) {
    Object.defineProperties(o, otherObj)
  }
  return o
}
```

#### new
```js
function createNew(fn) {
  var o = new Object()
  o.__proto__ = fn.property
  const result = fn.call(o)
  return typeof result === 'object' ? result : o
}
```


