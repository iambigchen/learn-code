#### Content-Type

application/x-www-form-urlencoded    浏览器form的post提交

application/json    以json格式post提交

text/plain 默认是这个，服务器会以文字解析

text/html 服务器以html解析

form-data 格式(方便之处体现在不必明确地在xhr对象上设置请求头，xhr能够识别传入的数据是formdata格式)

```js
var data = new FormData()
data.append("name", "abc")
xhr.send(data)
```





#### 完整的ajax

```js
var xhr= new XMLHttpRequest
xhr.onreadystatechange= function(){
  if(xhr.readyState == 4) {
		if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
      alert(xhr.responseText)
    }
  }
}
xhr.open('get', 'url', true) // 方法，url，是否异步

xhr.send(data)

```



#### 进度事件

```js
loadstart 接收到响应的第一个字节触发
progress 接收响应期持续不断触发
error 请求发生错误时触发
abort 在调用abort（）终止连接时触发
load 在接收完整响应数据时触发
loadend 在通信完成或者触发error，abort或者load事件后触发
```



#### 跨域

```js
简单使用get和post请求时，没有自定义头部，而主体内容时text/plain。在发送请求时，需要额外添加一个Origin头部，包含请求页面的源信息
Origin: https://twww.lizihang.com

如果服务器认为这个请求可以接受，就在Access-Control-Allow-Origin头部发回相同源信息，如果是公共资源，可以回'*'
Access-Control-Allow-Origin: https://twww.lizihang.com

如果没有这个头部，或者有这个头部，但是源信息不匹配，浏览器就会驳回这个请求
```



#### CORS

[http://www.ruanyifeng.com/blog/2016/04/cors.html](http://www.ruanyifeng.com/blog/2016/04/cors.html)



####WS(websocket)

```js
var socket = new WebSocket('ws://www.example.com') // 不可以用相对地址，必须是绝对地址。ws和wss
socket.send('hello') // 只能是字符串，如果复制数据，要序列化JSON.stringify

socket.onmessage = function(event) {
  var data = event.data //需要解析数据
}

socket.close()关闭连接

socket.readyState // 当前状态 0（正在建立连接），1（已经建立连接），2（正在关闭连接），3（已经关闭连接） readyState值永远从0开始

socket.onopen //成功建立连接时触发
socket.onerror //发生错误时触发，连接不能持续
socket.onclose //在关闭时触发
```



**1 .  Fdasfa**

**2. Sdafadf**

