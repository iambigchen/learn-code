#### 浏览器线程
1. GUI渲染线程
- 渲染页面，解析html，css，构建dom树
- 当页面重绘或回流，会重新执行该线程
- 与js引擎线程互斥

2. JS引擎线程
- 负责处理js代码，执行代码
- 执行准备好的事件
- 与gui线程互斥，所以如果js引擎线程过长，会导致页面渲染阻塞

3. 定时器触发线程
- 负责执行异步定时器的函数线程
- 主线程执行代码时，遇到定时器，将定时器交给该线程处理，当计时完毕后，事件触发线程会把计时完毕后的事件加到任务进程末尾，等待js引擎线程执行

4. 事件触发线程
- 把准备好的事件，交给js引擎执行

5. 异步http请求线程
- 负责执行异步请求一类函数的线程，如promise，axios
- 主线程执行代码时，遇到了异步代码时，会把异步代码交给该线程处理，当异步执行完成后，把回调函数由事件触发线程交给js引擎执行


#### macro-task 
1. script
2. setTimeOut, setInterval

### micro-task
1. Promise
2. process.nextTick
3. MutationObserver

#### 执行完一次macro-task后，会先执行一遍micro-task，才会进入下一个macro-task

#### 在每个 task 运行完以后，UI 都会重渲染，那么在 microtask 中就完成数据更新，当前 task 结束就可以得到最新的 UI 了。反之如果新建一个 task 来做数据更新，那么渲染就会进行两次。

#### 要创建一个新的 microtask，优先使用 Promise，如果浏览器不支持，再尝试 MutationObserver。实在不行，只能用 setTimeout 创建 task 了


#### node 的执行机制和浏览器不同，并不会在执行完一个宏任务后，会立即执行微任务.而是在该阶段执行完成后，去执行该阶段的微任务。比如：如果timer阶段，定义了多个微任务，会在timer阶段结束后，才去执行这些微任务

```js
timers ->  i/o callbacks -> poll -> check -> close callback -> timers
```
1. timers 执行timer（setTimeout、setInterval）的回调
2. i/o callbacks 上一轮循环中的少数未执行的 I/O 回调
3. 获取新的I/O事件, 适当的条件下node将阻塞在这里
4. 执行 setImmediate() 的回调
5. 执行 socket 的 close 事件回调

```js
setImmediate(function immediate () {
  console.log('immediate');
});
setTimeout(function timeout () {
  console.log('timeout');
},0);
```

因为check 在 timeout之后，所以上面应该先打印出timeout。但是由于 setTimeout(fn, 0) === setTimeout(fn, 1)。所以不确定两者先后执行顺序

```js
const fs = require('fs')
fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout');
    }, 0)
    setImmediate(() => {
        console.log('immediate')
    })
})
```
上面会先打印 immediate，因为在i/o callback 之后，最近的应该是check，之后才是timeout

#### process.nextTick 是微任务，但是执行顺序高于其他任意一个微任务
