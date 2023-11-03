#### 无依赖绝对定位

一般写法

```css
.father {
	position: relative;}
.shape {  
 	position: absolute;
 	top:0;
 	left: 0
 }

```

无依赖绝对定位写法

```css
.shape {
       position: absolute;
}
```



position:absolute，然后通过 margin 属性进行定位，效果即达成



###使用无依赖绝对定位场景

输入框校验信息

联想下拉框

输入框后面的按钮

图标和文字同行显示