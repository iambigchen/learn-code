```js
var a = true
a instanceof Boolean // false

var b = 1
b instanceof Number // false

var c = 'w'
c instanceof String // false

var d = {}
d instanceof Object // true
```



为什么会出现这种情况？



```js
var str = 'hello'

var str1 = String('hello')

var str2 = new String('hello')

str === str1 // true
str === str2 // false
str1 === str2 // false

str instanceof String // false

str1 instanceof String // false

str2 instanceof String // true

typeof str // string
typeof str1 //string
typeof str2 //object

```



Str  str1  定义出来的是在栈中并且值相等   str2定义出来的仅仅是栈中的一个指针



数字、字符串、布尔三者，在JS中称为原始的(primitives)资料类型

而 new String(), new Number() 就是包装对象



原始资料类型的方法与属性是"借"来的
一个原始的资料类型值，并没有如对象会有属性或方法，
原始的资料类型在运算时用的属性与方法，是向包装对象"借来"的用的