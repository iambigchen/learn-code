#### dom 元素位置

#### `offsetTop` `offsetLeft`
`offsetTop` `offsetLeft` 是相对定位父级的偏移量，即向父级找，到该元素不是`position: static`的时候，一直到body,，该元素与目标元素的偏移量即为`offsetTop` `offsetLeft`.

可通过`offsetParent`来找到该元素的相对定位父级

#### `offsetHeight` `clientHeight` `scrollHeight`
`offsetHeight` 包含了 border，padding，横行滚动条高度
`clientHeight` 包含了 padding
`scrollHeight` 当前不可见部分的元素的高度 + 可见高度 所以当没有滚动条时，`clientHeight` === `scrollHeight`
所以出现滚动条后，可见区域会被滚动条遮住一部分，可见区域变成了`clientHeight`

#### `scrollTop`
`scrollTop` 滚动条向下滚动的距离 没有滚动条时 `scrollTop` === 0

#### `getBoundingClientRect()`
```js
{
  left: 距离屏幕左上角距离, // 获取元素距离页面左上角 left + window.scrollX
  top: 距离屏幕左上角距离, // 获取元素距离页面左上角 top + window.scrollY
  right: 距离屏幕左上角距离 = left + width,
  bottom: 距离屏幕左上角距离 = top + height,
  width: 宽, // 是offsetWidth
  height: 高, // 是offsetHeight
  x: left,
  y: top
}
```
#### `window.getComputedStyle(dom)['height']`
`window.getComputedStyle(dom)['height']` = 实际高度，不包含padding，border等 = clientHeight - padding

#### `style.height`
该方法只能获取内联样式