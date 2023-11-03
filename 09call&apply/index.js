Function.prototype.call2 = function (contenxt, ...args) {
    contenxt = contenxt || global
    contenxt.fn = this
    let result = contenxt.fn(...args)
    delete contenxt.fn
    return result
}

Function.prototype.apply2 = function (contenxt, args = []) {
    contenxt = contenxt || global
    contenxt.fn = this
    let result = contenxt.fn(...args)
    delete contenxt.fn
    return result
}

// 测试一下
var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

// bar.call2(null); // 2

// console.log(bar.call2(obj, 'kevin', 18));


bar.apply2(null); // 2

console.log(bar.apply2(obj, ['kevin', 18]));