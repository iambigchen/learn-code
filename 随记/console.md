#### console.dir()

当我们打印HTML文档中的节点时，看到的是该DOM节点下的所有属性信息，而不是该dom节点



#### console.table()

```js
var a = [{a: 1,b:2},{a: 2,b:3},{a: 11,b:12}]
console.table(a, ['a', 'b'])
```



#### console.assert()

`assert`即断言，该方法接收多个参数，其中第一个参数为输入的表达式，只有在该表达式的值为`false`时，才会将剩余的参数输出到控制台中。



#### console.trace()

该方法用于在控制台中显示当前代码在堆栈中的调用路径，通过这个调用路径我们可以很容易地在发生错误时找到原始错误点



#### console.count()

该方法相当于一个计数器，用于记录调用次数，并将记录结果打印到控制台中

```js
for (let i = 1;i <= 5;i++) {
    if (!(i % 2)) {
        console.count('even');
    } else {
        console.count('odd');
    }
}
// odd: 1
// even: 1
// odd: 2
// even: 2
// odd: 3
```



#### console.time() & console.timeEnd()

```js
console.time('sum');
let sum = 0;
for(let i = 0;i < 100000;i++) {
    sum += i;
}
console.timeEnd('sum');
```



#### console.group() & console.groupEnd()

对数据信息进行分组，其中`console.group()`方法用于设置分组信息的起始位置，该位置之后的所有信息将写入分组，`console.groupEnd()`方法用于结束当前的分组