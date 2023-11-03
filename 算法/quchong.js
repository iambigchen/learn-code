let arr = []

function fn1(list) {
  return [...new Set(list)]
}
arr = [1,3,5,7,10,3, 5]
console.log(fn1(arr))

function fn2(list){
  let _arr = []
  return list.filter(e => {
    if (!_arr.includes(e)) {
      _arr.push(e)
      return true
    }
  })
}
arr = [1,3,5,7,10,3, 5]
console.log(fn2(arr))

function fn3(list) {
  return list.reduce((pre, current) => {
    if (!pre.includes(current)) {
      pre.push(current)
    }
    return pre
  }, [])
}
arr = [1,3,5,7,10,3, 5]
console.log(fn3(arr))

function fn4(list) {
  let obj = {}
  list.forEach(e => {
    obj[e] = e
  })
  return Object.values(obj)
}
arr = [1,3,5,7,10,3, 5]
console.log(fn4(arr))

function fn5(list) {
  let length = list.length
  const newList = list.sort()
  for (let i = 0;  i< length - 1; i++) {
    if (newList[i] === newList[i+1]) {
      newList.splice(i, 1)
    }
  }
  return newList
}
arr = [1,3,5,7,10,3, 5]
console.log(fn5(arr))