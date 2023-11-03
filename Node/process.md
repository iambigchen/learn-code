#### process对象是一个Global全局对象，你可以在任何地方使用它，而无需require



#### process中的事件

1. #### 退出事件:exit

   ```js
   process.on('exit', function(code) {
     // 进程退出后，其后的事件循环将会结束，计时器也不会被执行
     setTimeout(function() {
       console.log('This will not run');
     }, 0);
     console.log('进程退出码是:', code);
   });
   //'exit'事件会在进程退出时触发。'exit'事件的监听器可以用来检查进程退出的状态，在其回调函数中会有一个进程退出的状态码。有一点要注意，'exit'事件触发后事件循环将会停止，记时器等也会失效。
   ```

   

2. #### 未处理异常: 'uncaughtException'

   ```js
   //当进程异常退出时，会触发'uncaughtException'事件，当此引发此事件的异常一般并不明确，因此不建议使用，推荐使用domains模块进行异常处理。
   ```

   

### process标准流对象

`process`中有三个标准备流的操作，与`Streams`流操作不同的是，`process`中流操作是阻塞的

1. `process.stdout`是一个指向标准输出流的可写流

   ```js
   console.log = function(d) {
     process.stdout.write(d + '\n');
   };
   ```

   

2. #### 标准错误流：process.stderr

   `console.error`就是通过`process.stderr`实现的。

3. #### 标准输入流：process.stdin

   标准输入流默认是暂停 (pause) 的，所以必须要调用 `process.stdin.resume()` 来恢复 (resume) 接收。



#### process中的属性

#### 1.进程命令行参数的数组：process.argv

```js
process.argv.forEach(function(val, index, array) {
  console.log(index + ': ' + val);
});
// 执行node process.js arg1 arg2 输出如下
0: node
1: /Users/liuht/code/itbilu/demo/process.js
2: arg1
3: arg2
```



2. #### 启动进程程序的路径：process.execPath

 返回是node的安装路径



3. #### 命令行参数数组：process.execArgv

   ```js
   node --harmony script.js --version
   process.execArgv => ['--harmony'] 
   process.argv => ['/usr/local/bin/node', 'script.js', '--version']
   ```

   

4. #### 运行环境对象：process.env

5. #### 进程退出码：process.exitCode

6. #### Node编译时的版本：process.version



#### process中的方法

1. 触发一个abort事件：process.abort()

   会导致Node解发一个abort事件并结束进程

2. #### 工作目录切换：process.chdir(directory)、process.cwd()

   `process.chdir()`方法用于改变当前进程的工作目录。`process.cwd()`方法返回进程当前的工作目录

3. #### 终止当前进程：process.exit([code])

4. #### 延迟方法执行：process.nextTick()

   与`setTimeout(fn, 0)`相比`nextTick`方法效率高很多，该方法能在任何 I/O 事前之前调用我们的回调函数。