#### arguments

类数组对象，有callee属性，指向拥有这个arguments对象的函数，对于递归函数很有用

```js
function a(num) {
  if (num <= 1) {
    return 1
  } else {
    return num * a(num-1)
  }
}
//这个方法和a紧密耦合了，如果a赋值给其他变量，方法就失效了
function a(num) {
  if (num <= 1) {
    return 1
  } else {
    return num * arguments.callee(num-1)
  }
}

//或者
var fun = (function f(num) {
  if (num <= 1) {
    return 1
  } else {
    return num * f(num-1)
  }
})
```



#### length

表示函数可接收参数个数