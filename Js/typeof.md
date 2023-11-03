未声明的变量使用时，会报错，只能执行typeof指令，结果为undefined



undefined派生于null， 所以undefined == null



typeof null      'object'



NaN和任何值都不相等，包括NaN ，任何涉及到NaN的操作都会返回NaN



isNaN(a) 先把a转换为数值，再判断是不是NaN，所以也可以用来判断一个值能不能转为数值

isNaN('a') true  

isNaN('3') false

 isNaN(true) false(转成1了)



typeof可以确定基本类型

instanceof 可以确定引用类型