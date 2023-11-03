function instanceof2 (left, right) {
  let prototype = right.prototype;
  let result = false
  while(left.__proto__) {
    if (left.__proto__ === prototype) {
      result = true
      break
    }
    left = left.__proto__
  }
  return result
}
const FN = function () {

}
const fn = new FN()

console.log('instanceof', fn instanceof FN)
console.log('instanceof2', instanceof2(fn, FN))

console.log('instanceof', fn instanceof Object)
console.log('instanceof2', instanceof2(fn, Object))

console.log('instanceof', fn instanceof Function)
console.log('instanceof2', instanceof2(fn, Function))