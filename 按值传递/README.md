## 按值传递

把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样

### 按值传递

```js
var value = 1;
function foo(v) {
    v = 2;
    console.log(v); //2
}
foo(value);
console.log(value) // 1
```

### 引用传递？

```js
var obj = {
    value: 1
};
function foo(o) {
    o.value = 2;
    console.log(o.value); //2
}
foo(obj);
console.log(obj.value) // 2
```

### 共享传递

```js
var obj = {
    value: 1
};
function foo(o) {
    o = 2;
    console.log(o); //2
}
foo(obj);
console.log(obj.value) // 1
```

参数如果是基本类型是按值传递，如果是引用类型按共享传递。所以第二个和第三个例子其实都是按共享传递。