// function createPerson(name) {
//     var o = new Object();
//     o.name = name;
//     o.getName = function () {
//         console.log(this.name);
//     };

//     return o;
// }

function Person(name) {
    this.name = name;
    this.getName = function () {
        console.log(this.name);
    };
}

// var person1 = createPerson('kevin');
// var person2 = createPerson('kevin2');

var person1 = new Person('kevin');
var person2 = new Person('kevin2');

console.log('---------', person1.__proto__ === Person.prototype)
console.log('---------', person2.__proto__ === Person.prototype)