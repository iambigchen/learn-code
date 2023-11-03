#### isNaN 先把参数变成数值，再判断是不是NaN

```js
console.log(isNaN(1)) // false
console.log(isNaN('a')) // true
console.log(isNaN(null)) // false
console.log(isNaN(undefined)) // true
console.log(isNaN(false)) // false
```