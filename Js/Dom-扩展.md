

###activeElement.  hasFocus

```js

document.activeElement获取获得焦点的元素
var btn = document.getElementById('myBtn')
btn.focus()
document.activeElement == btn // true

document.hasFocus() 元素是否获得焦点
var btn = document.getElementById('myBtn')
btn.focus()
btn.hasFocus() // true

```



####readyState

```js
document.readyState == 'complete'  // 文档加载完成
document.readyState == 'loading'  // 正在加载文档
```



#### 自定义数据属性

```js
<div id="myDiv" data-appId='123' data-myName='abc'></div>

var div = document.getElementById('myDiv')
div.dataset.appId = 123
div.dataset.myName = 'abc'
  
```



####innerHTML 插入srcipt标签，不会执行



#### scrollIntoViewIfNeeded

如果元素不可见，则滚到视野范围内，如果可见，则什么也不做



#### document.body.scrollByLines(5)将页面主体滚动5行



#### document.body.scrollByPages(-1) 将页面主体往回滚动一页

