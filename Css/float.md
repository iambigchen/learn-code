#### clear

元素盒子的边不能和前面的浮动元素相邻。

clear 属性只有块级元素才有效的，而::after 等伪元素默认都是内联水平，这就是借 

助伪元素清除浮动影响时需要设置 display 属性值的原因。

```css
.clear:after {
 content: '';
 display: table; // 也可以是'block'，或者是'list-item' 
 clear: both; 
} 
```

clear:both 只能在一定程度上消除浮动的影响

