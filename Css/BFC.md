如果一个元素具有 BFC，内部子元素再怎么翻江倒海、翻云覆雨，都不会影响外部的元素。所以，BFC 元素是不可能发生 margin 重叠的，因为 margin重叠是会影响外面的元素的;BFC 元素也可以用来清除浮动的影响，因为如果不清除，子元素浮动则父元素高度塌陷，必然会影响后面元素布局和定位，这显然有违 BFC 元素的子元素不会影响外部元素的设定。



#### 那什么时候会触发 BFC 呢?

- <html>根元素; 
- float 的值不为 none; 
- overflow 的值为 auto、scroll 或 hidden; 
- display 的值为 table-cell、table-caption 和 inline-block 中的任何一个; 
- position 的值不为 relative 和 static。 

