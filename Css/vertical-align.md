#### Vertical-align:middle不起作用

1.vertical-align 属性只能作用在 display 计算值为 inline、inline-
block，inline-table 或 table-cell 的元素上。



2.

```css
.box {
      height: 128px;
}
.box > img {
      height: 96px;
      vertical-align: middle;
    }
    <div class="box">
      <img src="1.jpg">
</div>
```

这种情况看上去是 vertical-align:middle 没起作用，实际上，vertical-align
是在努力地渲染的，只是行框盒子前面的“幽灵空白节点”高度太小.如下修改即可

```css
.box {
  height: 128px;
  line-height: 128px;
}
.box > img {
  height: 96px;/*关键CSS属性*/
  vertical-align: middle;
}
```



#### vertical-align值

baseline默认值 === 0

数字，+为baseline基础上移， -为baseline基础下移

百分比

##### baseline

1.文本之类的内联元素那里就是字符 x 的下边缘

2.一个 inline-block 元素，如果里面没有内联元素，或者 overflow 不是 visible，
则该元素的基线就是其 margin 底边缘;否则其基线就是元素里面最后一行内联元素的基线。

#####图标文字对齐技巧

```css
<p><i class="icon icon-delete"></i> 删除</p>

.icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    white-space: nowrap;
    letter-spacing: -1em;
    text-indent: -999em;
    background: url(/images/5/delete.png) no-repeat center;
}
.icon:before {
    content: '\3000'; //对齐的关键
}
```





#### 图片出现空隙

因幽灵空白节点与图片需要基线对其，导致图片上移

解决办法： 1，图片设置vertical-align其他值，不基线对其

​					2，容器设置line-height: 0, 或者font-size：0将容器变得足够小，让img去撑开这个容器

​					3.   将图片块状化，解决“幽灵空白节点”、line-height 和 vertical- 

align。
 



#### 实现弹窗

```css
<div class="container">
      <div class="dialog"></dialog>
</div>

.container {
      position: fixed;
      top: 0; right: 0; bottom: 0; left: 0;
      background-color: rgba(0,0,0,.5);
      text-align: center;
      font-size: 0;
      white-space: nowrap;
      overflow: auto;
    }
.container:after {
      content: '';
      display: inline-block;
      height: 100%; // 90%从视觉上更像居中
      vertical-align: middle;
}
.dialog {
      display: inline-block;
      vertical-align: middle;
      text-align: left;
      font-size: 14px;
      white-space: normal;
}
```

