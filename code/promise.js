class Promise2{
  constructor (executor) {
    this.status = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    const resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled'
        this.value = value
        this.onResolvedCallbacks.forEach(fn=>fn())
      }
    }
    const reject = (reason) => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn=>fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled = (result) => result, onRejected = (err) => {throw err}) {
    let promise2 = new Promise2((resolve, reject)=>{
      if (this.status === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.status === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.status === 'pending') {
        this.onResolvedCallbacks.push(()=>{
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e)
            }
          })
        })
        this.onRejectedCallbacks.push(()=>{
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e)
            }
          })
        })
      }
    })
    return promise2
  }
  catch(onRejected) {
    return this.then(null, onRejected)
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  let called
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return
          called = true
          resolvePromise(promise2, y, resolve, reject)
        }, err => {
          if (called) return
          called = true
          reject(err)
        })
      } else {
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true
      reject(err)
    }
  } else {
    resolve(x)
  }
}

Promise2.resolve = function (val) {
  return new this((resolve, reject) => {
    resolve(val)
  })
}
Promise2.reject = function(val) {
  return new this((resolve,reject) => {
    reject(val)
  })
}
Promise2.race = function (promises) {
  return new this((resolve,reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('You must pass an array to race.'))
    }
    promises.forEach(e => {
      e.then(resolve, reject)
    })
  })
}
Promise2.all = function (promises) {
  return new this((resolve,reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('You must pass an array to race.'))
    }
    let arr = []
    let j = 0
    promises.forEach((e, i) => {
      e.then((res) => {
        arr[i] = res
        j++
        if (j >= promises.length) {
          resolve(arr)
        }
      }, reject)
    })
  })
}

let count = 0
let count2 = 0
function asyncFn () {
  console.log('pre promise', count);
  return new Promise2((resolve, reject) => {
    setTimeout(() => {
      count = 100
      resolve(count)
    }, 300)
  })
}
function asyncFn2 () {
  console.log('pre promise22', count2);
  return new Promise2((resolve, reject) => {
    setTimeout(() => {
      count2 = 200
      resolve(count2)
    }, 300)
  })
}
asyncFn().then(res => {
  console.log('res', res);
  console.log('count', count);
})
Promise.all([asyncFn(), asyncFn2()]).then(res => {
  console.log('resresres', res)
})