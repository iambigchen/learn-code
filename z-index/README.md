#### z-index 默认值 是auto 不是 0 
- auto 即没有形成层叠上下文，内部元素安装普通对比即可
- 0 形成了层叠上下文，与上下元素会先对比该元素的z-index值，来显示层级。
```js
<div style="position:relative; z-index:0;">
    <img src="mm1.jpg" style="position:absolute; z-index:2;">
</div>
<div style="position:relative; z-index:0;">
    <img src="mm2.jpg" style="position:relative; z-index:1;">
</div>
```
mm2 在 mm1之上

```js
<div style="position:relative; z-index:auto;">
    <img src="mm1.jpg" style="position:absolute; z-index:2;">
</div>
<div style="position:relative; z-index:auto;">
    <img src="mm2.jpg" style="position:relative; z-index:1;">
</div>
```
mm1 在 mm2之上

#### 层叠顺序规则
```js
background/border < 负z-index < block < float < inline-block/block < z-index 0 或 z-index auto< 正z-index
```