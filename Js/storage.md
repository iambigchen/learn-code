对storage对象进行任何修改，都会在文档上触发storage事件

```js
document.addEventListener('storage', function(e) {
  alert(e)
})
```

