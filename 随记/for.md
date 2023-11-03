###for

最普通的for循环

```js
for (var index = 0; index < myArray.length; index++) {
  console.log(myArray[index]);
}
```



### forEach

break和return不起作用, 无法中途跳出`forEach`循环

```js
myArray.forEach(function (value) {
  console.log(value);
});
```



### for…in

`for...in`循环主要是为遍历对象而设计的，不适用于遍历数组。

- 数组的键名是数字，但是`for...in`循环是以字符串作为键名“0”、“1”、“2”等等。
- `for...in`循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
- 某些情况下，`for...in`循环会以任意顺序遍历键名。

```js
for (var index in myArray) {
  console.log(myArray[index]);
}
```



### for…of

​	只能对有`Symbol.iterator`属性的使用，如array，map， set（obj不行）

- 有着同`for...in`一样的简洁语法，但是没有`for...in`那些缺点。
- 不同于`forEach`方法，它可以与`break`、`continue`和`return`配合使用。
- 提供了遍历所有数据结构的统一操作接口。

```js
for (var n of fibonacci) {
  if (n > 1000)
    break;
  console.log(n);
}
```

