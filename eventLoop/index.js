console.log(1)

setTimeout(() => {
  console.log(2);
})

const pro = new Promise((resolve, reject) => {
  console.log(3)
  resolve()
})

pro.then(res => {
  console.log(4)
  setTimeout(() => {
    console.log(7)
  })
})

process.nextTick(() => {
  console.log(5)
})

setTimeout(() => {
  console.log(8)
  process.nextTick(() => {
    console.log(9)
  })
})

console.log(6)

// 1 3 6 4 5 2 8 9 7