Function.prototype.bind2 = function (context, ...args) {
    var self = this;
    var fNOP = function () {};
    function fBound(...args2) {
        return self.call(this instanceof fBound ? this : context, ...args, ...args2);
    }
    fNOP.prototype = this.prototype
    fBound.prototype = new fNOP()
    return fBound
}

var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind2(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin