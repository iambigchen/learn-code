#### 基础类型 object
基础类型： `string null undefined boolean symbol number bigInt`
`bigInt`: `BigInt("9007199254740995") 或者 9007199254740995n`

`object`： `Array Function Set Map WeakSet WeakMap Date JSON`

#### a1 = 'a', a2 = String('a'), a3 = new String('a')
```js
a1 === a2 // true
typeof a3 === 'object' // true
console.log(a1 instanceof String) // false
console.log(a3 instanceof String) // true
```
a3不是基础类型，而是个object。
所有基础类型，本身没有方法和属性。是向该类型的包装类型（new String new Number）借的，所以 a1 instanceof String 为false

#### null vs undefined 
1. undefined 未定义的值 表示一个变量最原始的状态，而非人为操作的结果
2. null 空值 表示一个对象被人为的重置为空对象，而非一个变量最原始的状态 
他俩都是无效值，所以有相似处，所以
```js
null == undefined // true
```

#### typeof
```js
typeof [] // 'object'
typeof null // 'object'
```
typeof 之所以会判定null为 Object 类型,是因为JavaScript 数据类型在底层都是以二进制的形式表示的，二进制的前三位为 0 会被 typeof 判断为对象类型，而 null 的二进制位恰好都是 0 ，因此，null 被误判断为 Object 类型。

#### instanceof
`A instanceof B`
判断准则为 沿着A的__proto__这条线来找，同时沿着B的prototype这条线来找，如果两条线能找到同一个引用，即同一个对象，那么就返回true。如果找到终点还未重合，则返回false。

instanceof本质是调用对象的Symbol.hasInstance属性方法
```js
const Even = {
  [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
}
```
instanceof存在问题？
1. `[] instanceof Array` // true  `[] instanceof Object` // true 
2. instanceof的前提条件是单一的全局执行环境,如果网页包含多个框架，那实际就存在两个以上的全局执行环境了，从而存在两个以上不同版本的Array的构造函数（constructor）

#### 判断类型
Object.prototype.toString.call()