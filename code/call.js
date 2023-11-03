Function.prototype.call2 = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }
  const args = [...arguments].slice(1)
  const {fn} = context
  context.fn = this
  const result =  context.fn(...args)
  context.fn = fn
  return result
}

const testObj = {
  a: 1,
  b: 2
}
const testCall = function (c) {
  return this.a + this.b + c
}
console.log('call', testCall.call(testObj, 3))
console.log('call2', testCall.call2(testObj, 3))

Function.prototype.apply2 = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }
  const args = [...arguments][1] || []
  const {fn} = context
  context.fn = this
  const result =  context.fn(...args)
  context.fn = fn
  return result
}
console.log('apply', testCall.apply(testObj, [3]))
console.log('apply2', testCall.apply2(testObj, [3]))

Function.prototype.bind2 = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }
  const fn = this
  const preArgs = [...arguments].slice(1)
  return function (...args) {
    return fn.apply(context, [...preArgs, ...args])
  }
}

const bind2 = testCall.bind2(testObj, 9)
const bind = testCall.bind(testObj, 9)
console.log('bind', bind(3))
console.log('bind2', bind2(3))
