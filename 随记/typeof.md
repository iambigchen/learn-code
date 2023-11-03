typeof不准确，一般源码中都不会用这个来判断类型



```js
var to = {}.toString

var a = 'w'
typeof a // string
to.call(a) //[object String]

var b = new String('w')
typeof b // object
to.call(b) //[object String]

var c = 1
typeof c // number
to.call(c) //[object Number]

var d = new Number(1)
typeof d // object
to.call(d) //[object Number]

var e = {a: 1}
typeof e //object
to.call(e) //[object Object]

var f = new Object({a: 1})
typeof f //object
to.call(f) //[object Object]

var g = new Object(null)
typeof g //object
to.call(g) //[object Object]

to.call(null) // [object Null]

to.call(undefined) // [object Undefined]

to.call(NaN) // [object Number]
```



> new String()和new Number()出来的，和直接var出来的是不同的

```js
var a = 1
a instanceof Number //false

var b = new Number(1)
b instanceof Number // true

var c = 'w'
c instanceof String // false

var d = new String('w')
d instanceof String // true
```



```js
  const getProto = Object.getPrototypeOf; // 用来判断一个对象是否有__proto__
	
	var a = {}
  getPropto(a) // {constructor.....}

	var b = new Object(null)
  getPropto(b) // {constructor.....}

	var c = Object.create(null)
  getPropto(c) // null
```



