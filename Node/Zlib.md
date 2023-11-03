#### Zlib模块实现流压缩与解压

- 创建`gzip`压缩类`Gzip`：zlib.createGzip([options])
- 创建`gzip`解压类`Gunzip`：zlib.createGunzip([options])
- 创建`deflate`压缩类`Deflate`：zlib.createDeflate([options])
- 创建`deflate`解压类`Inflate`：zlib.createInflate([options])
- 创建`deflate`原始数据压缩类`DeflateRaw`：zlib.createDeflateRaw([options])
- 创建`deflate`原始数据解压类`InflateRaw`：zlib.createInflateRaw([options])

```js
var zlib = require('zlib');
var http = require('http');
var fs = require('fs');
http.createServer(function(request, response) {
  var raw = fs.createReadStream('index.html');
  var acceptEncoding = request.headers['accept-encoding'];
  if (!acceptEncoding) {
    acceptEncoding = '';
  }

  // 对客户端请求的 accept-encoding 进行简单解析（非标准的）
  if (acceptEncoding.match(/\bdeflate\b/)) {
    response.writeHead(200, { 'content-encoding': 'deflate' });
    raw.pipe(zlib.createDeflate()).pipe(response);
  } else if (acceptEncoding.match(/\bgzip\b/)) {
    response.writeHead(200, { 'content-encoding': 'gzip' });
    raw.pipe(zlib.createGzip()).pipe(response);
  } else {
    response.writeHead(200, {});
    raw.pipe(response);
  }
}).listen(1337);
```

