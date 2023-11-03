// 节流
function debounce(method, context) {
  clearTimeout(method.id)
  method.id = setTimeout(() => {
    method.call(context)
  }, 500)
}

// 防抖
function throttle(method,  context) {
  if (!method.id) {
    method.id = setTimeout(() => {
      method.call(context)
      method.id = null
    }, 500)
  }
}

let i = 0
function testD() {
  console.log('debounce', i);
}
function testT() {
  console.log('throttle', i);
}
const inter = setInterval(() => {
  i++
  if (i > 20) {
    return clearInterval(inter)
  }
  
  debounce(testD, this)
  throttle(testT, this)
}, 100)
