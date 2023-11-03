function Person() {

}

Person.prototype.a = 1
// Person.prototype.constructor = 1

var person = new Person()

console.log('---------', person.__proto__ === Person.prototype)
console.log('---------', person.constructor === Person)
console.log('---------', Person.prototype.constructor)

var person2 = new Person()
console.log('---------', person2.__proto__.constructor)