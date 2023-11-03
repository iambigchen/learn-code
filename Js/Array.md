####为什么不用 arr instanceof Array来判断arr是否为数组？



instanceof操作符问题在于，它假定单一的全局执行环境，如果网页包含多个框架，那实际就存在两个以上的全局执行环境了，从而存在两个以上不同版本的Array的构造函数（constructor）



eg.页面A嵌套这iframe的页面B，在页面A中往B的全局注入一个数组，在B中判断时发现arr instanceof Array 是false，原因是A，B的Array挂载在不同的window下，所以他们俩的构造函数不同





使用Array.isArray()即可判断是否为数组



##### reverse数组反转

```js
var arr = [1, 2, 3, 4]
arr.reverse()
arr => [4,3,2,1]
```



#### sort数组排序

sort默认是按字符串来排序

```js
var arr = [0, 1, 5, 10, 15]
arr.sort()
arr => 0, 1, 10,, 15, 5
```



sort可接受一个函数,返回值为 负数（第一个参数在第二个之前）， 0（两个数相等）， 正数（第一个参数在第二个之后）

```js
function compare(val1, val2) {
  if (val1 < val2) {
    return -1
  } else if (val1 > val2) {
    return 1
  } else if (val1 == val2) {
    return 0
  } 
}
//如果全是数字也可以写为
// 升序
function compare(val1, val2) {
  return val1 - val2
}
// 降序
function compare(val1, val2) {
  return val2 - val1
}
```

