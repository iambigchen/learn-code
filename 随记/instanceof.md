---
typora-root-url: ../assets
---

> Instanceof运算符的第一个变量是一个对象，暂时称为A；第二个变量一般是一个函数，暂时称为B。



> Instanceof的判断队则是：沿着A的\__proto\_\_这条线来找，同时沿着B的prototype这条线来找，如果两条线能找到同一个引用，即同一个对象，那么就返回true。如果找到终点还未重合，则返回false。





![181637013624694](../assets//181637013624694.png)



> 因为每个对象都有一个隐藏的属性——“\__proto\_\_”，这个属性引用了创建这个对象的函数的prototype



> 每个函数都有一个属性叫做prototype。这个prototype的属性值是一个对象（属性的集合，再次强调！），默认的只有一个叫做constructor的属性，指向这个函数本身。



> 访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着_\_proto__这条链向上找，这就是原型链。



> hasOwnProperty 区分一个属性到底是基本的还是从原型中找到



> 函数在定义的时候（不是调用的时候），就已经确定了函数体内部自由变量的作用域
>
> this是在函数调用时确定的
>
> 在执行代码之前，把将要用到的所有的变量都事先拿出来，有的直接赋值了，有的先用undefined占个空



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



```js
对象的Symbol.hasInstance属性，指向一个内部方法。
foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)
```



> 自定义instanceof

```js
// 等同于
const Even = {
  [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
};

1 instanceof Even // false
2 instanceof Even // true
12345 instanceof Even // false
```



