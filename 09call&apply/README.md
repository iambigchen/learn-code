## call

实现call

```js
Function.prototype.call2 = function (contenxt, ...args) {
    contenxt = contenxt || global
    contenxt.fn = this
    let result = contenxt.fn(...args)
    delete contenxt.fn
    return result
}
```

## apply


```js
Function.prototype.apply2 = function (contenxt, [...args]) {
    contenxt = contenxt || global
    contenxt.fn = this
    let result = contenxt.fn(...args)
    delete contenxt.fn
    return result
}
```