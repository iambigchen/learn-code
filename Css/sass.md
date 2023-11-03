文件名以.scss结尾



@import 引入css



```scss
@mixin b($block) {
  $B: $namespace+'-'+$block !global; // !global为$B变量在其他的mixin也能直接用

  .#{$B} {
    @content; // css内容
  }
}

@include b(row) {
  position: relative;
  box-sizing: border-box;
}
// 以上会被编译成
.el-row{
  position: relative;
  box-sizing: border-box;
}
```



```scss
@at-root {
  &.#{$state-prefix + $state} {
    @content;
  }
}
// & 父选择器
// @at-root把样式规则定义在根目录下，而不是嵌套在其父选择器下
.A{
  color: blue
  @at-root {
    .a{
      color: red
    }
  }
}
// 会被编译成
.A{
  color: blue
}
.a{
   color: red
}
// 而不是 .A .a{color: red}
```



### 变量

```scss
$a: 100px !default // 100px是默认值
$a: 100px! // 改变默认值
  
//把多个相关的值写在一个变量里，然后通过nth($var,index)来获取第几个值。$var是指变量名，index是需要的值在第几个位置。
$linkColor: red blue !default;

a{
    color:nth($linkColor,1);

    &:hover{
        color:nth($linkColor,2);
    }
}
```



Maps不能转换为纯CSS。作为变量的值或参数传递给CSS函数将会导致错误。使用`inspect($value)` 函数以产生输出字符串，这对于调试 maps 非常有用。