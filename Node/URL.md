### URL字符串转换为对象:url.parse

```js
var url = require('url');

var urlString = 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash';
var result = url.parse(urlString);

//{ protocol: 'http:',
  slashes: true,
  auth: 'user:pass',
  host: 'host.com:8080',
  port: '8080',
  hostname: 'host.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' }
```



#### 将对象格式化为URL字符串：url.format

```js
var url = require('url');

var urlObj = { protocol: 'http:',
	slashes: true,
	hostname: 'itbilu.com',
	port: 80,
	hash: '#hash',
	search: '?query=string',
	path: '/nodejs?query=string'
}
var result = url.format(urlObj);

//http://itbilu.com:80?query=string#hash
```



#### RL路径处理：url.resolve(from, to)

```js
url.resolve('/one/two/three', 'four')         // '/one/two/four'
url.resolve('http://example.com/', '/one')    // 'http://example.com/one'
url.resolve('http://example.com/one', '/two') // 'http://example.com/two'
```



