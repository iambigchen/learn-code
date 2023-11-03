## 静态作用域

JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。属于静态作用域

```
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar(); // 输出1
```

执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据书写的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。


## 变量提升

js执行过程，分成编译和运行，在编译过程，会收集所有变量，在当前作用域下声明。这个提前声明就是变量提升。`所有的声明都有变量提升`，var,let,const,class,function

```
a = 1
var a

```

let, const也会有变量提升，但是因为暂时性死区，在let 和 const声明变量之前，会出现这个变量的`暂时性死区`，即不可以使用这个变量。

```
function a() {
    console.log(x)
}
let x = 1
a() // 1
```
上面的代码证明let、const有变量提升，因为如果没有提升x的声明，a执行时，应该会找不到x，而不是输出1

var 只对函数作用域敏感，let const 对 {}作用域敏感。`暂时性死区`也只会在当前作用域{}