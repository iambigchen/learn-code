##### `Connection: keep-alive` 
http1.1实现了长连接，所谓的长连接指的是tcp三次握手后，不会立刻断开。默认的`Connection: keep-alive` ，可以通过设置为`Connection: close`关闭 

##### `Accept-Encoding` `Content-Encoding`
`accept-encoding` 可接受的压缩方式 `Accept-Encoding: gzip, deflate`
`content-encoding` 返回方式的压缩方式 `Content-Encoding: gzip`

```js
const acceptEncoding = req.headers['accept-encoding']
const filePath = path.resolve(__dirname, 'index.html')
const raw = fs.createReadStream(filePath)
if (acceptEncoding.includes('gzip')) {
  res.setHeader('Content-Encoding', 'gzip')
  raw.pipe(zlib.createGzip()).pipe(res)
}
```

#### `Accept` `Content-Type`
`Accept` 客户端希望接受的格式

`Accept: text/palin; q=0.3, text/html`
q=来额外表示权重，用分号；分割。权重值q的范围是0-1，1为最大，不指定权重值，默认权重是q=1.0

`Content-Type` 响应返回的格式

#### `Expires` http1.0的产物，设置缓存过期时间的，所以在http1.0权重是高于Cache-Control， 但在http1.1后，就低于Cache-Control
`res.setHeader('Expires', 'Wed Apr 29 2020 11:30:00 GMT')`

#### `Cache-Control`
`no-store` 不让浏览器缓存
`no-cache` 不缓存过期资源，缓存会向服务器进行有效期确认后处理资源
`public` cdn等缓存服务器可以缓存
`private` 只有浏览器可以缓存
`max-age` 缓存时间
`s-maxage` 缓存服务器的缓存时间,在缓存服务器上，优先级高于`max-age`
....

`Expires` 和 `Cache-Control` 都称为强缓存，即缓存后，除非到了缓存时间，不然浏览器或缓存服务器会一直缓存

#### 协商缓存 304

##### `Last-Modified` `If-Modified-Since`
服务器在res设置了 `Last-Modified` 头后，浏览器再次请求时，会在请求头带上`If-Modified-Since`， 值为 `Last-Modified`的值
服务器端对比`If-Modified-Since`的值，来判断是否为304
```js
if (req.headers['if-modified-since']) {
  res.statusCode = 304
  res.end()
}
```

#### `ETag` `If-None-Match`
`ETag` 为后端生成的文件唯一标识，如果变了的话，该唯一标识也会和请求头中的`If-None-Match`不同
```js
const filePath = path.resolve(__dirname, '12.png')
const raw = fs.createReadStream(filePath)
const md5 = crypto.createHash('md5')
raw.on('data', (data) => {
  md5.update(data)
})
raw.on('end', () => {
  let etag = md5.digest('hex')
  if (etag === req.headers['if-none-match']) {
    res.statusCode = 304
    res.end()
    return
  }
  res.setHeader('ETag', etag)
  raw.pipe(res)
})
```

#### 服务器校验应该优先考虑`Etag`

#### CORS 的相关响应头
```js
res.setHeader('Access-Control-Request-Methods', 'POST, GET, OPTIONS, PUT')
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8002')
res.setHeader('Access-Control-Allow-Headers', 'AA')
```

#### http code码
1. 2xx 成功
200 成功
2. 3xx 重定向
301 永久移动 302 临时移动 304 未修改
3. 4xx 请求错误
401 未授权 403 服务器拒绝请求 404 未找到
4. 5xx 服务器端错误
500 服务器内部错误 503 服务不可用 504 超时

#### get post 区别
1. get会让浏览器主动缓存，post不会
2. get更多是在url上传参数，post则更多在request的body中。但是get也可以在request的body传参，post也可以在url上传参数
3. 因为get和post的传参只是认为规定，不是必须的，所以他们俩更多的区别应该是url参数区别和request的body传参的区别
4. url参数有大小限制，chrome为2mb，request的body则没有
5. url参数只能支持ASCII， request的body能支持任意的编码

#### https的流程
1. Client-hello 阶段
浏览器输入地址后，经过dns，找到服务器，尝试连接 （TLS 握手协议的 Client-hello） 浏览器会将"支持的加密组件"/"尝试连接到Host头"等信息发送给服务器, 并会附上一份随机生成的 session ticket1.
2. Server-hello 阶段
浏览器收到了TLS握手请求后，存储发送来的session ticket1， 然后根据发来的host寻找对应的服务器证书。然后将服务器证书，随机生成的 session ticket2 一并返回给浏览器
3. Cipher-spec 阶段
浏览器收到服务器返回的证书后, 会验证证书有效性，步骤如下
 - 验证证书有效时间
 - 验证证书域名
 - 验证证书的吊销状态
 - 验证证书的颁发机构
 如果检测通过，则随机生成一份 session ticket 3，通过返回证书中的公钥, 用协商的"秘钥交换算法"加密, 返回给服务器。同时浏览器用 session ticket 1(浏) & session ticket 2(服) & session ticket 3(浏) 组合成 session key.
服务器用私钥对发过来的密文进行解密，解密出session ticket3，用 session ticket 1(浏) & session ticket 2(服) & session ticket 3(浏) 组合成 session key.
4. 内容传输阶段
 TLS 连接建立完成, 在连接销毁前, 浏览器与服务器彼此数据均通过 session key 来进行对称加密.