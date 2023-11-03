#### If-Match

只有当if-match字段值和ETag值匹配一致时，服务器才会接受请求



#### If-Modified-Since

如果在If-Modified-Since字段指定的日期时间后，资源发生了更新，服务器会接受请求



#### If-None-Match

只有在If-None-Match字段值和ETag不一致时，可处理该请求

在get或head方法使用首部字段，可获取最新的资源



#### If-Range

若指定的If-Range和服务器ETag一致，也作为范围请求处理，反之，则返回全部资源

```js
If-Range: '123456'
Range: byte=50001-100000

// 相当于两次请求
If-Match： '12345'
Range: byte=50001-100000

GET: /
```



#### If-Unmodified-Since

如果在If-Unmodified-Since字段指定的日期时间后，资源没有发生更新，服务器会接受请求

