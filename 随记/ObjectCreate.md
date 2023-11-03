###Object.create(null)可以生成更简洁的{}



###Object.create(proto,[propertiesObject])

​	proto: 新创建对象的原型对象

​	propertiesObject： 可选，要添加新对象的可枚举（新添加的属性是其自身的属性，而不是其原型链上的属性）的属性。



```js
const car = {
  isSportsCar: false,
  introduction: function () {
    console.log(`Hi girl, this is a ${this.name}. 
    Do you like to have a drink with me ? ${this.isSportsCar}`);
  }
};

const porsche = Object.create(car,{
    //color成为porsche的数据属性
    //颜色不喜欢，可以改色或贴膜，所以可修改
    color:{
        writable:true,
        configurable:true,
        value:'yellow'
    },
    //type成为porsche的访问器属性
    type:{
        // writable、configurable等属性，不显式设置则默认为false
        // 想把普通车改成敞篷，成本有点大了，所以就设成不可配置吧
        get:function(){return 'convertible'},
        set:function(value){"change this car to",value}
    }
});

porsche.name = "Porsche 911"; // "name"是"porsche"的属性, 而不是"car"的
porsche.isSportsCar = true; // 继承的属性可以被覆写

porsche.introduction();
// expected output: "Hi girl, this is a Porsche 911. Do you like to have a drink with me ? true"

```



###如何用Object.create()实现{}同样的效果？

```js
var a = Object.create(Object.prototype)

或者

var a = Object.create({}.__proto__)
```



###什么时候会用到？

除了上面创造一个简洁的对象外，更多的是在继承时



```js
//声明一个类
function Animal(){
	alert("这时候创建了一个Animal对象");
}
Animal.prototype.say=function(){
	alert("啊");
};
//声明一个子类
function Cat(){
}

Cat.prototype=new Animal();//继承Animal

// ====以上代码应改为以下方法

Cat.prototype=Object.create(Animal.prototype);//继承Animal

// 这种方法比第一种好的原因是，new Animal时，执行了Animal的构造函数，而第二种方法则不会去执行，显然更适合我们只是要继承的实现

Cat.prototype.constructor=Cat;
Cat.prototype.say=function(){
	alert("喵");
};
var cat=new Cat();
console.log(cat instanceof Cat);//true
console.log(cat instanceof Animal);//true
```

