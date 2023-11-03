function fangdou (fn, timeout) {
    let timeName
    return function (...args) {
        if (timeName) {
            clearTimeout(timeName)
        }
        timeName = setTimeout(() => {
            fn(...args)
        }, timeout)
    }
}
let fangdouFn = fangdou(() => {
    console.log('fangdou')
}, 1000)

fangdouFn()
fangdouFn()
fangdouFn()
fangdouFn()


function jieliu (fn, timeout) {
    let flag = true
    return function (...args) {
        if (flag) {
            flag = false
            setTimeout(() => {
                flag = true
                fn(...args)
            }, timeout)
        }
    }
}


let jieliuFn = jieliu(() => {
    console.log('jieliu')
}, 1000)

jieliuFn()
jieliuFn()
jieliuFn()
jieliuFn()

let obj = {
    name: 'obj'
}

Function.prototype.call2 = function (obj, ...args) {
    obj.fn = this
    let res = obj.fn(...args)
    delete obj.fn
    return res
}

function callTest (a, b) {
    console.log('call', this.name, a, b)
}
callTest.call2(obj, 'a', 'b')


Function.prototype.apply2 = function (obj, args) {
    obj.fn = this
    let res = obj.fn(...args)
    delete obj.fn
    return res
}

function applyTest (a, b) {
    console.log('apply', this.name, a, b)
}
applyTest.apply2(obj, ['a', 'b'])


Function.prototype.bind2 = function (obj, ...args) {
    let fn = this
    return function (...args2) {
        return fn.apply2(obj, [...args, ...args2])
    }
}

function bindTest (a, b) {
    console.log('bind', this.name, a, b)
}
bindTest.bind2(obj, 'a')('b')


class Subject {
    constructor () {
        this.stack = []
    }

    add (ob) {
        this.stack.push(ob)
    }

    notice ()  {
        this.stack.forEach(ob => {
            ob.update()
        })
    }
}

class Watcher {
    constructor (fn) {
        this.fn = fn
    }
    update () {
        this.fn()
    }
}



function myNew () {
    let fn = [].shift.call(arguments)
    let obj = new Object()

    obj.__proto__ = fn.prototype

    let res = fn.apply(obj, arguments)
    if (typeof res === 'object') {
        return res
    } else {
        return obj
    }
}


function myInstanceof (obj, fn) {
   while(obj) {
       if (obj.__proto__ === fn.prototype) {
           return true
       }
       obj = obj.__proto__
   }
   return false
}


Object.prototype.assign1 = function (...args) {
    let target = args.shift()
    args.forEach(e => {
        for(let key in e) {
            if (e.hasOwnProperty(key)) {
                target[key] = e[key]
            }
        }
    })
    return target
}

let a = {
    a:1,
    c: 4
}

let a1 = Object.assign1(a, {b: 2, a: 3})

console.log('---------', a1)

function formNum(num) {
    num = String(num)
    return num.replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
      return s + ','
    })
}



var deepCopy = function(obj, ) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj[key] === obj) continue
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}

deepCopy({
    a: [21,3,4],
    b: 1
})


// for of for in 可以continue break ,不能有return

// forEach map可以return ，不能有continue break

