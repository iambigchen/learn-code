## 闭包

闭包是指那些能够访问自由变量的函数。

## 自由变量

自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量

闭包 = 函数 + 函数能够访问的自由变量

```
var a = 1;

function foo() {
    console.log(a);
}

foo()
```
理论上说，foo构成了闭包。但只是理论上。

## 从实践角度：以下函数才算是闭包

1. 创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
2. 在代码中引用了自由变量


```
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2]();
```

3
3
3

```js
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = (function (i) {
    function () {
      console.log(i);
    }
  })(i);
}

data[0]();
data[1]();
data[2]();
```

0
1
2

```js
var data = [];

for (let i = 0; i < 3; i++) {
  data[i] = function () {
      console.log(i);
  }
}

data[0]();
data[1]();
data[2]();
```

0
1
2

这是因为let 关键字将 for 循环的块隐式地声明为块作用域。而 for 循环头部的 let 不仅将 i 绑定到了 for 循环的块中，事实上它将其重新绑定到了循环的每一个迭代中，确保使用上一个循环迭代结束时的值重新进行赋值。

上面的代码可以看成以下代码

```js
var data = [];

var _loop = function _loop(i) {
  data[i] = function () {
    console.log(i);
  };
};

for (var i = 0; i < 3; i++) {
  _loop(i);
}

data[0]();
data[1]();
data[2]();
```