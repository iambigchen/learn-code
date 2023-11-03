```js
new Vue({
  data() {
    msg: '1'
  }
})

data -> vm._data
vm.msg -> proxy代理 -> vm._data.msg

中间是通过一层代理proxy的
```

