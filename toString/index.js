// Object.prototype.toString = function () {
//     console.log('---------', 1)
//     return 1
// }

// Object.prototype.valueOf = function () {
//     return 1
// }

// Array.prototype.toString = function () {
//     console.log(2)
//     return 2
// }

// var a = {}
// var v = {}
// var c = []
// console.log(a / v)
// console.log(1 / c)
// console.log(a == 1)


class A {
    constructor () {
        this.value = 1
    }
    valueOf () {
        return this.value++
    }
    toString () {
        return this.value++
    }
}

var a = new A()

console.log(a==1&&a==2&&a==3)


// Object.defineProperty(window, 'b', {
//     get () {
//         return value++
//     }
// })

// let value = 1

// var _window = new Proxy(window, {
//     get (target, key, receiver) {
//         if (key === 'b') {
//             return value++
//         }
//         Reflect.set(target, key, receiver)
//     }
// })

// console.log(_window.b===1&&_window.b===2&&_window.b===3)



function add (...args) {
    let res = 0
    args.forEach(e => {
        res += e
    })
    function sum (...args2) {
        args2.forEach(e => {
            res += e
        })
        return sum
    }
    sum.toString = function  () {
        return res
    }
    return sum
}

console.log(add(1))