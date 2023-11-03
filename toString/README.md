## toString

使用操作符 (+-*/><==的时候，如果其中一边为对象，则会先调用toSting方法，也就是隐式转换，然后再进行操作。

全等(===)：严格等于不会进行隐式转换

## valueOf


- 在进行对象转换时，将优先调用toString方法，如若没有重写 toString，将调用 valueOf 方法；如果两个方法都没有重写，则按Object的toString输出。
- 在进行强转字符串类型时，将优先调用 toString 方法，强转为数字时优先调用 valueOf。
- 使用运算操作符的情况下，valueOf的优先级高于toString。

## Symbol.toPrimitive

- 同valueOf()和toString()一样，但是优先级要高于这两者

- 该函数被调用时，会被传递一个字符串参数hint，表示当前运算的模式，一共有三种模式：
string：字符串类型
number：数字类型
default：默认
