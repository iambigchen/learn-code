#### JSON.stringify

```js
var obj = {
  a: 1,
  b: 2
}
JSON.stringify(obj, a) // "{a: 1}" 第二个参数穿数组时，可达到过滤效果

JSON.stringify(obj, function(key ,val){
  if (key == 'a'){
    return 20 // return undefined 则会过滤a   "{"b":"3"}"
  } 
  return val // 一定要有return val
}) // "{"a":20,"b":"3"}"

toJSON
var obj = {
  a: 1,
  b: 2,
  toJSON: function() {}
  return 3
}
JSON.stringify(obj) // 3
JSON.stringify顺序是：
1. 有toJSON函数，执行toJSON函数，否则按默认执行顺序
2. 如果提供第二个参数，应用这个函数过滤器。传入函数过滤器的值是第一步返回的值
3. 对第二步返回的每个值进行序列化
4. 如果提供第三个参数，执行相应的格式化
```



#### JSON.parse

```js
JSON.parse(obj, function(key ,val){
  if (key == 'a'){
    return 20 // return undefined 则会过滤a   {"b":"3"}
  } 
  return val // 一定要有return val
}) // {"a":20,"b":"3"}


```



