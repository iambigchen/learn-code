#### 将对象序列化为一个查询字符串：querystring.stringify

```js
var querystring = require('querystring');

var itbilu = {siteName:'IT笔录', url:'http://itbilu.com'};

// siteName=IT%E7%AC%94%E5%BD%95&url=http%3A%2F%2Fitbilu.com
// 不指定后面三个可选参数时，默认用"&"（分割符）连接参数，"="（分配符）符号连接参数名和参数值，并用encodeURIComponent方法对参数进行编码
```



#### 将查询字符串解析为对象：querystring.parse

