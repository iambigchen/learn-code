#### 1.数据属性

数据属性包含一个数据值的位置，在这个位置可以读取和写入值。数据属性有4个描述其行为的特性

1. configurable:表示能否通过delete删除属性，从而重新定义属性，能否修改属性特性，或者能否把属性改为访问器属性。(直接在对象定义，默认为true，若Object.defineProperty设置属性，不设置该值默认为false)

2. enumerable：能否通过for-in返回属性    (直接在对象定义，默认为true，若Object.defineProperty设置属性，不设置该值默认为false)

3. writable：能否修改属性值   (直接在对象定义，默认为true，若Object.defineProperty设置属性，不设置该值默认为false)

4. Value:包含这个属性的数据值



```js
Object.defineProperty(obj, 'name', {
	configurable： false,
  enumerable: false,
  writable: false,
  value:'a'
})
如果设置了configurable为true，则没法将该对象属性configurable设回为false了
```



#### 2.访问器属性

访问器属性不包含数据值，包含一对getter和setter。访问器属性有以下特性

1. Configurable:表示能否通过delete删除属性，从而重新定义属性，能否修改属性特性，或者能否把属性改为访问器属性   (直接在对象定义，默认为true，若Object.defineProperty设置属性，不设置该值默认为false)

2. enumerable：能否通过for-in返回属性   (直接在对象定义，默认为true，若Object.defineProperty设置属性，不设置该值默认为false)
3. Get:在读取属性时调用的函数，默认是undefined
4. set:在写入属性时调用的函数，默认是undefined

访问器属性不能直接定义，必须通过Object.defineProperty定义



Object.getOwnPropertyDescriptor()方法可以取得给定属性的描述符

```js
var book = {}
Object.defineProperties(book, {
  _year: {
    value: 2004
  }
})
var a = Object.getOwnPropertyDescriptor(book, "_year")
a.value // 2004
a.configurable // false
```



```js
var Obj = function() {
  this.say = function() {
    alert('a')
  }
}
var obj1 = new Obj()
var obj2 = new Obj()
//这样写，obj1和obj2的say方法不是同一个方法

var Obj = function() {
  this.say = say
}
function say() {
    alert('a')
 }
var obj1 = new Obj()
var obj2 = new Obj()
// 这样写指向了一个方法，但是say成了全局方法

var Obj = function() { 
}
Obj.prototype.say = function(){
  alert('a')
}
var obj1 = new Obj()
var obj2 = new Obj()

Obj.prototype.constructor == Obj
obj1.__proto__ == Obj.prototype
obj1.say == obj1.__propto.say == Obj.prototype.say

Object.getPrototypeOf(obj1) == Person.prototype
obj.hasOwnProperty('say') // false 

// 想得到对象所有属性，不论是否可枚举
Object.getOwnPropertypeNames() // constructor也会列出
```



```js
var Obj = function() {
}
Obj.prototype.arr = arr
Obj.prototype.say = function(){
  alert('a')
}
var obj1 = new Obj()
var obj2 = new Obj()
obj1.arr.push(1)
obj2.arr = [1]
// 这样写的问题在于，1.没法传参数 2.arr指向了同一个引用数组

var Obj = function(arr) {
  this.arr = arr
}
Obj.prototype.say = function(){
  alert('a')
}

```



```js
确定原型和实例关系
obj instanceof Obj
Obj.prototype.isPrototypeOf(obj)
```

