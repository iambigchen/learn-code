**setInterval问题**

setInterval的定时原理是，当使用setInterval()时，仅当没有该定时器的任何其他代码实例时，才将定时器代码添加到队列中，这样确保了定时器代码加入队列时，不会有其他的定时器代码，不会连续运行好几次，保证了队列的最小间隔为指定间隔

问题是：1. 某些间隔会被跳过

				2. 多个定时器的代码执行之间的间隔可能比预期的小。 



解决方法:用setTimeout模拟setInterval

```js
setTimeout(function() {
  setTimeout(arguments.callee, interval)
}, interval)
```

