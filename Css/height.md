在父元素没有确定高度时，元素的height：100%是不生效的



Position: absolute的元素计算百分比是相对于 padding box 

非绝对定位元素则是相对于 content box 计算的

（因此想要height：100%可以通过设置Position: absolute，或者父元素给固定高）

