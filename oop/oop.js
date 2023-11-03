// function Super () {
//   this.arr = []
// }
// function Sub () {

// }
// Sub.prototype = new Super()

// var sup = new Super()
// var sub = new Sub()
// var sub2 = new Sub()
// sub.arr.push(1)
// console.log(Sub.prototype.constructor === Super)
// console.log(sub2.arr)

// =====================

// function Super () {
//   this.arr = []
// }
// Super.prototype.say = function() {
//   console.log('say');
// }
// function Sub () {
//   Super.call(this)
// }
// var sup = new Super()
// var sub = new Sub()
// sup.say()

// =====================

// function Super() {
//   this.arr = []
// }
// Super.prototype.say = function(){
//   console.log('say');
// }
// function Sub() {
//   Super.call(this)
// }
// Sub.prototype = new Super()
// var sup = new Super()
// var sub = new Sub()

// =====================

// function Super() {
//   this.arr = []
// }
// Super.prototype.say = function(){
//   console.log('say');
// }
// function Sub() {
//   Super.call(this)
// }
// Sub.prototype = Object.create(Super.prototype)
// var sup = new Super()
// var sub = new Sub()

// =====================

// function Cr(obj) {
//   let o = new Object()
//   o.__proto__ = obj
//   const args = [...arguments]
//   var otherObj = args[1]
//   if (otherObj) {
//     Object.defineProperties(o, otherObj)
//   }
//   return o
// }

// var a = {
//   a: 'a'
// }

// var b = {
//   value: 'bbbb'
// }

// var a1 = Object.create(a, {b})
// console.log(a1)

// var a2 = Cr(a, {b})
// console.log(a2);

// =====================

function createNew(fn) {
  var o = new Object()
  o.__proto__ = fn.property
  const result = fn.call(o)
  return typeof result === 'object' ? result : o
}

var A = function () {
  this.a = 'aaaa'
}

var a1 = new A
console.log(a1);

var a2 = createNew(A)
console.log(a2);