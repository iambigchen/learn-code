#### nodeType

```js
if (someNode.nodeType == 1) {
  alert('node is an emelent')
}
```



#### nodeName

```js
if (someNode.nodeType == 1) {
  val = someNode.nodeName // 'DIV A P'标签名
}
```



#### childNodes

一个nodeList，是类数组

```js
var arr = Array.prototype.slice(someNode.childNodes, 0)
```



#### partNaode父节点



#### 同胞节点previousSibling  nextSibling



####firstChild lastChild

```js
someNode.firstChild == someNode.childNodes[0]
someNode.lastChild == someNode.childNodes[someNode.childNodes.length - 1]
```



#### hasChildNodes()是否有子节点



#### 将节点放在某个位置insertBefore()

```js
var a = someNode.insertBefore(newNode, null)
a == someNode.lastChild // true

var b = someNode.insertBefore(newNode, someNode.firstChild)
b == newNoode // true
b == someNode.firstChild // true

var c = someNode.insertBefore(newNode, someNode.lastChild)
c == someNode.childNodes[some.childNodes.length -2]
```



#### 替换某个节点replaceChild()

```js
var a = someNode.replaveChild(newNode, someNode.firstChild)
```



#### 移除某个节点removeChild

```js
var a = someNode.remodeChild(someNode.firstChild)
```



#### 复制节点cloneNode

```js
var a = someNode.cloneNode(false) //浅复制，只复制该节点，而不复制子节点var b = someNode.cloneNode(true) //深复制，复制该节点和子节点
```



#### normalize()

如果某个节点调用这个方法，找到空白节点则删除它，找到相邻的文本节点，则合并成一个文本节点



#### createDocumentFragment

```js
var fragment = document.createDocumentFragment()
var ul =document.getElementById('myList')
var li = null
for (var i= 0;i<3;i++) {
  li = document.createElement('li')
  fragment.appendChild(li)
}
ul.appendChild(fragment)
// 这样可以避免浏览器反复渲染
```

