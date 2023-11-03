function _update(obj) {
  const htmlStr = `<input onKeyup="function onKeyup(event) {${changeValue(event)}}" data-model="obj.message" /><div>${obj.message}</div>`
  document.querySelector('#app').innerHTML = htmlStr
}

var data = {
  message: 'hello world'
}

function changeValue(event) {
  console.log(1234);
  console.log(event)
}

defineReactive(data, 'message')

_update(data)

setTimeout(() => {
  data.message = 1
}, 100)

setTimeout(() => {
  data.message = 11
}, 1000)

function defineReactive(obj, key) {
  const property = Object.getOwnPropertyDescriptor(obj, key)
  const getter = property && property.get
  const setter = property && property.set
  let val
  if (!getter || setter) {
    val = obj[key]
  }
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      const value = getter ? getter.call(obj) : val
      return value
    },
    set(newVal) {
      const value = getter ? getter.call(obj) : val
      if (newVal === value) {
        return
      }
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      _update(obj)
    }
  })
}