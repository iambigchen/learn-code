#### path.normalize

```js
path.normalize('/foo/bor//asds/quu/..')
// 'foo/bor/asds'
```



#### path.join

```js
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')
// '/foo/bar/baz/asdf'

//不合法的字符串将抛出异常
path.join('foo', {}, 'bar')
// 抛出异常
```



#### path.resolve

```js
//其处理方式类似于对这些路径逐一进行cd操作，与cd操作不同的是，这引起路径可以是文件，并且可不必实际存在（resolve()方法不会利用底层的文件系统判断路径是否存在，而只是进行路径字符串操作）

path.resolve('/foo/bar', './baz')
// 输出结果为
'/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/')
// 输出结果为
'/tmp/file

path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')
// 当前的工作路径是 /home/itbilu/node，则输出结果为
'/home/itbilu/node/wwwroot/static_files/gif/image.gif'

```



#### path.dirname path.basename path.extname

```js
path.dirname('/Users/liuht/code/itbilu/demo/path.js')
// 结果
'/Users/liuht/code/itbilu/demo'

path.basename('/Users/liuht/code/itbilu/demo/path.js')
// 结果
'path.js'

path.extname('/Users/liuht/code/itbilu/demo/path.js')
// 结果
'.js'

//path.basename()方法还可以指定第二个参数：文件的扩展名，指定后可以提取文件名。指定扩展名不合法时将返回文件全名
path.basename('/Users/liuht/code/itbilu/demo/path.js', '.js')
// 结果
'path'

path.basename('/Users/liuht/code/itbilu/demo/path.js', '.html')
// 结果
'path.js'
```

