####当http首部字段重复了，会如何？

​	规范不明确，各浏览器内部处理逻辑不同，结果可能并不一致



#### 4种http首部字段类型

通用首部字段： 请求报文和响应报文双方都会使用的首部

请求首部字段

响应首部字段

实体首部字段： 针对请求报文和响应报文实体部分使用的首部。补充了资源内容更新时间等与实体有关的消息



#### 通用首部

| 首部字段名        | 说明                                                         |
| ----------------- | ------------------------------------------------------------ |
| Cache-Control     | 控制缓存行为                                                 |
| Connection        | 逐跳首部、连接管理（Connetcion: keep-alive时，http使用了使用长连接。默认是keep-alive） |
| Date              | 创建报文的日期时间                                           |
| Pragma            | 报文指令（Pragma: no-cache和Cache-Control: no-cache 效果一致，在Cache-Control出现后，渐渐不用） |
| Trailer           | 报文末端的首部一览（允许发送方在分块发送的消息后面添加额外的元信息，必须是分块发送即Transfer-Encoding: chunked才起作用  Transfer-Encoding: chunked  Trailer: Expires  [`Expires`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Expires) 首部出现在分块信息的结尾） |
| Transfer-Encoding | 指定报文主体的传输编码方式（Transfer-Encoding: chunked分块传输） |
| Upgrade           | 升级为其他协议                                               |
| Via               | 代理服务器的相关信息                                         |
| Warning           | 错误通知                                                     |



####请求首部字段

| 首部字段            | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| Accept              | 用户代理可处理的媒体类型                                     |
| Accept-Charset      | 优先的字符集                                                 |
| Accept-Encoding     | 优先的内容编码                                               |
| Accept-Language     | 优先的语言（自然语言）                                       |
| Authorization       | Web认证信息                                                  |
| Expect              | 期待服务器的特定行为                                         |
| From                | 用户的电子邮箱地址                                           |
| Host                | 请求的资源所在服务器（唯一一个必须包含在请求内的首部字段）   |
| If-Match            | 比较实体标记（ETag， 如果服务器端匹配到了hash值，则有缓存）  |
| If-Modified-Since   | 比较资源的更新时间（Last-Modified， 优先级低于If-Match If-No-Match） |
| If-No-Match         | 比较实体标记（ETag， 如果服务器端没有匹配到了hash值，则没有缓存） |
| If-Range            | 资源未更新时发送实体Byte的范围请求（范围请求时的字段）       |
| If-Unmodified-Since | 比较资源的更新时间（If-Modified-Since相反）                  |
| Max-Forwards        | 最大传输逐跳数                                               |
| Proxy-Authorization | 代理服务器要求客户端的认证信息                               |
| Referer             | 对请求URI的原始请求获取方                                    |
| Range               | 实体字节的范围请求                                           |
| TE                  | 传输编码的优先级                                             |
| User-Agent          | Http客户端程序的信息                                         |



#### 响应首部字段

| 首部字段名         | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| Accept-Ranges      | 是否接受字节范围请求                                         |
| Age                | 推算资源创建经过的时间                                       |
| ETag               | 资源的匹配信息                                               |
| Location           | 令客户端重定向指定的URI（301，302等重定向响应，201也有Location） |
| Proxy-Authenticate | 代理服务器对客户端的认证信息                                 |
| Retry-After        | 对再次发送请求的时机要求                                     |
| Server             | Http服务器的安装信息                                         |
| Vary               | 代理服务器缓存的管理信息                                     |
| WWW-Authenticate   | 服务器对客户端的认证信息                                     |



#### 实体首部字段

| 首部字段名       | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| Allow            | 资源可支持的Http方法                                         |
| Content-Encoding | 实体主体适用的编码方式                                       |
| Content-Language | 实体主体的自然语言                                           |
| Content-Length   | 实体主体的大小（单位：字节）                                 |
| Content-Location | 替代对应资源的URI                                            |
| Content-MD5      | 实体主体的报文摘要                                           |
| Content-Range    | 实体主体的位置范围                                           |
| Content-Type     | 实体主体的媒体类型                                           |
| Expires          | 实体主体过期的日期时间（Cache-Control的max-age是高于expires） |
| Last-Modified    | 资源的最后修改日期时间                                       |

