#### 浏览器事件机制

##### 捕获阶段、目标阶段和冒泡阶段
1. 捕获阶段
Window 到达目标元素父节点的过程称为捕获阶段，注意此时还未到达目标节点

2. 目标阶段
最终到达目标节点，并在目标节点上触发了这个事件，这就是目标阶段。事件触发的目标节点为最底层的节点

3. 冒泡阶段
当事件到达目标节点之后，就会沿着原路返回

4. `addEventListener(eventName, handler, useCapture)` 
`useCapture`为是否在捕获阶段进行事件处理
如果是 false， 则在冒泡阶段进行事件处理，如果是 true，在捕获阶段进行事件处理。默认是 false

5. `event`对象
`target` 指触发事件的元素
`currentTarget` 指事件所绑定的元素
`clientX/Y` 点击位置相对于浏览器内容区域左上角的位置
`offsetX/Y` 点击位置相对于所处元素左上角的位置
`screenX/Y` 点击位置相对于屏幕左上角的位置
`pageX/Y` 点击位置相对整张页面左上角的位置, pageX/Y = 滚动条高度 + clientX/Y

- [元素所处位置](../domOffset/README.md)

6. `event.stopPropagation()`取消事件冒泡 `event.preventDefault()`取消默认行为