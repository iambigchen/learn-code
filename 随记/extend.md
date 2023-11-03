```js
class A{}
class B extends A{}
let b = new B();
```



B类继承了A类



原理

```js
class A {
}

class B {
}

// B的实例继承A的实例
Object.setPrototypeOf(B.prototype, A.prototype);
const b = new B();

// B的实例继承A的静态属性
Object.setPrototypeOf(B, A);
const b = new B();
```



setPrototypeOf

```js
Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
```

