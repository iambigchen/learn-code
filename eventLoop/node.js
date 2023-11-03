console.log('start')
setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(function() {
    console.log('promise1')
  })
}, 0)
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(function() {
    console.log('promise2')
  })
}, 0)
Promise.resolve().then(function() {
  console.log('promise3')
})
console.log('end')
// start
// end
// promise3
// timer1
// timer2
// promise1
// promise2

// 执行顺序和浏览器下，是不同的

setImmediate(function immediate () {
  console.log('immediate');
});
setTimeout(function timeout () {
  console.log('timeout');
},0);

// timeout immediate

setTimeout(() => {
  console.log('timer11')
  Promise.resolve().then(function() {
    console.log('promise11')
  })
 }, 0)
 process.nextTick(() => {
  console.log('nextTick')
  process.nextTick(() => {
    console.log('nextTick')
    process.nextTick(() => {
      console.log('nextTick')
      process.nextTick(() => {
        console.log('nextTick')
      })
    })
  })
 })
 // nextTick=>nextTick=>nextTick=>nextTick=>timer1=>promise1