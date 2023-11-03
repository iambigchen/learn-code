// 红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？

function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}



// function run (fn) {
//     let delay = 3000
//     let next = green
//     if (fn === green) {
//         delay = 2000 
//         next = yellow
//     }
//     if (fn === yellow) {
//         delay = 1000
//         next = red
//     }
//     setTimeout(() => {
//         fn()
//         run(next)
//     }, delay)
// }

// run(red)

// promise

// function run(fn) {
//     let delay = 3000
//     let next = green
//     if (fn === green) {
//         delay = 2000 
//         next = yellow
//     }
//     if (fn === yellow) {
//         delay = 1000
//         next = red
//     }
//     return new Promise((reslove) => {
//         setTimeout(() => {
//             fn()
//             reslove()
//         }, delay)
//     })
// }

// function start () {
//     run(red).then(() => run(green)).then(() => run(yellow)).then(start)
// }

// start()



// 实现每隔一秒打印 1,2,3,4

// function log (i) {
//     setTimeout(() => {
//         console.log(i)
//         if (i === 4) return
//         log(++i)
//     }, 1000)
// }

// log(1)

async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')           // 1
    new Promise(resolve => {
        console.log('async promise')
        resolve('async promise start')
    }).then(res => {                    // 2
        console.log(res)
    }).then(res => {
        console.log(1)
    })
}

async function async2() {
    console.log('async2')
}

async1()

new Promise((resolve) => {
    console.log('promise')
    resolve()
}).then(function () {                 // 3
    console.log('promise1 start')
    return 'promise1 end'
}).then(res => {                      // 4
    console.log(res)
}).then(res => {                      // 5
    console.log(res)
})