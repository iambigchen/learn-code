#### 300ms出现的原因？

移动端会出现双击放大页面的效果，这两次双击之间的间隔是300ms，所以当我们在一次点击的时候，会等待300ms，如果300ms后，没有第二次点击，浏览器才会触发点击事件，造成了一种延迟点击的效果。

##### 解决方案:
通过`meta`标签，禁止双击放大事件来解决该问题
`<meta name="viewport" content="width=device-width, initial-scale=1.0">`

或者

`<meta name="viewport" content="width=device-width">`

#### 用`touchend`替代`click`事件
`touchend`替代`click`的话，会出现如果用户只是滑动，而不是点击时，就会误触发点击事件。所以如果想用`touchend`替代，还需要做其他一些处理
如：
1. 计算`touchstart`和`touchend`两次事件之间的间隔，如果间隔很短，则认为用户是点击了页面
2. 计算`touchstart`和`touchend`两次事件触发时，用户手指点击页面的位置，如果位置相距很短，也可以认为是点击了页面

#### 用`touchend`替代`click`事件出现的点击事件穿透问题
如果页面两个元素A、B相叠加在页面，如果点击A页面，触发`touchend`，A页面消失，则会紧接着触发了B页面的`click`事件
解决方法如下：
1. 在`touchend`事件触发后，500ms内取消所有的`click`事件

#### `touchstart` `touchend` `touchmove` `click`事件执行顺序

`touchstart` > `touchmove`>`touchend`> `click`