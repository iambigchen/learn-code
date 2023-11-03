var number = 5;
var obj = {
    number: 3,
    fn1: (function () {
        console.log(this);
        var number;
        this.number *= 2; // window.number = 10
        number = number * 2; // undefined
        number = 3; // 3
        return function () {
            var num = this.number; // 10 3
            this.number *= 2; // 20 6
            console.log(num); // 10 3
            number *= 3; // 9
            console.log(number); // 9 27
        }
    })()
}
var fn1 = obj.fn1;
fn1.call(null);
obj.fn1();
console.log(window.number);