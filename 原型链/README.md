## prototype

每个函数都有一个prototype属性(箭头函数没有)，指向一个对象，这个对象是调用该构造函数而创建的实例的原型

## __proto__

每个对象都有一个__proto__属性，指向他的构造函数的原型对象

```
function Person () {

}
var person = new Person()
```

Person是person的构造函数，所以 person.__proto__ === Persion.prototype

Person是函数，也是对象。所以Person也有原型，他的原型是Person构造函数的原型对象，即Function.prototype。所以 Person.__proto__ === Function.prototype

Function, Object, String, Boolean, Number....等内置对象，他们的原型都指向Function的原型对象

Function.__proto__ === Object.__proto__ === Function.prototype    Function.__proto__ === String.__proto__  === Function.prototype
 

## constructor

构造函数的prototype对象中默认有个constructor属性，指向这个函数本身。

person.constructor = person.__proto__.constructor = Person.prototype.constructor = Person

## 原型链

当读取实例的属性时， 如果找不到该属性，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。
