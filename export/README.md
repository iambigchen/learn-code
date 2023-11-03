#### module.export 和 export区别
- export 是 module.export的引用，所以不能直接export = 'a',因为这样会改变export的指向。
- require方能看到的只有module.exports这个对象

#### es6 import 和 commonjs require区别
- require 可以放在任意位置，但是import只能放在文件最前面
- export default 导出的是内存变量，即使是基础数据类型。 moduel.exports 导出的只是普通数值