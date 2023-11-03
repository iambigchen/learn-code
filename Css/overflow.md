 PC 端，无论是什么浏览器，默认滚动条均来自<html>，而不是<body>标签

```css
所以，如果我们想要去除页面默认滚动条，只需要:
html { overflow: hidden; } 
```

而没必要把<body>也拉下水: 

```css
    html, body { overflow: hidden; }
```



上述规则只对 PC 端有效，对于移动端并不一定适用。例如，在 PC 端，对<html>
标签设置overflow:hidden可以隐藏滚动条禁止滚动，但是在移动端基本上无效。在PC端，窗体滚动高度可以使用 document.documentElement.scrollTop 获取，但是在移动端，可能就要使用 document.body.scrollTop 获取。



#### 出现滚动条页面晃动解决方法

```css
html {
   overflow-y: scroll;
}
:root {
  overflow-y: auto;
  overflow-x: hidden;
}
:root body {
  position: absolute;
}
body {
  width: 100vw;
  overflow: hidden;
}
```



#### 滚动条样式

 • 整体部分，::-webkit-scrollbar;
 • 两端按钮，::-webkit-scrollbar-button;
 • 外层轨道，::-webkit-scrollbar-track; 

 • 内层轨道，::-webkit-scrollbar-track-piece; • 滚动滑块，::-webkit-scrollbar-thumb;
 • 边角，::-webkit-scrollbar-corner。 

```css
::-webkit-scrollbar { /* 血槽宽度 */ 
  width: 8px; height: 8px;
}
::-webkit-scrollbar-thumb { /* 拖动条 */
  background-color: rgba(0,0,0,.3);
  border-radius: 6px;
}
::-webkit-scrollbar-track { /* 背景槽 */
  background-color: #ddd;
  border-radius: 6px;
}
```

