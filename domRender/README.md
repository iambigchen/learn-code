#### 浏览器获取html后，渲染过程
1. 解析节点（node），生成dom树
2. 遇到JavaScript标签，则解释并执行(所以js代码需要尽量往后放，因为js会阻塞html渲染)
3. 如果节点是其他资源，如css，图片等，会调用资源加载器来异步加载（这个过程是异步的，所以不会阻塞html的渲染）
4. 在所有的dom树构建完成后，会触发`DOMContentLoaded`事件，该事件会被js阻塞
5. 在所有异步资源加载完成后（js不包含在内），会触发`load`事件。
6. 构建出dom树和css树后，会把两个合并变成`render tree`（`display: node`的节点，不会在dom树中，但是`visibility: hidden; opacity: 0`是不会跳过的）
7. 有了`render tree`后，会计算各个节点的大小，位置等，该阶段为`layout`布局
8. 在有了大小位置后，接下来就是GPU渲染到屏幕的实际像素，即渲染出颜色等。改阶段为`paint`绘制
9. 如果js改变了dom树，或者css树，则会重复6步骤，重新合成`render tree` 和`layout` `paint`
10. `reflow` 回流： 如果改变了页面元素的布局，大小，结构，则需要重新进行`layout`布局，从而会再次进行`paint`绘制。
11. `repaint`重绘： 如果改变了页面的颜色等，则需要重新进行`paint`，称为重绘。回流一定会触发重绘，但重绘不一定触发回流。而且重绘的成本远高于回流

#### script阻塞到了页面渲染 加上defer或async属性
1. 加上defer 只是把js放到了dom最后面，而不是异步。即会在`DOMContentLoaded`事件之前执行
2. 加上async 会把js变成异步，会在`DOMContentLoaded`之后执行。但是仍然会等待js执行完后，才会触发`load`事件

#### 触发回流
1. DOM树变化（如：增删节点）
2. Render树变化（如：padding改变）
3. 浏览器窗口resize

#### 触发重绘
1. 背景色、颜色、字体颜色

#### 减少回流、重绘次数
1. 不要一条一条地修改 DOM 的样式，预先定义好 class，然后修改 DOM 的 className
2. 把 DOM 离线后修改，比如：先把 DOM 给 display:none (有一次 Reflow)，然后你修改100次，然后再把它显示出来
3. 用opacity替代visibility
4. 启用 GPU 硬件加速（GPU也有代价，数据有cpu到gpu是需要时间的）
5. 使用DocumentFragment