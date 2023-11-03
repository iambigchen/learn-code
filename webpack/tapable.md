```js
const tapable = require("tapable");

//顺序执行 a执行完执行b
 const SyncHook = new tapable.SyncHook(["arg1", "arg2", "arg3"]);

 SyncHook.tap('a', function(a1, a2, a3) {
    console.log(a1, a2, a3);
 })

 SyncHook.tap('b', function(a1, a2, a3) {
  console.log(a1, a2, a3);
})

SyncHook.call(1,2,3)


//条件执行，如果a满足条件执行a，如果不满足，再执行b
const SyncBailHook = new tapable.SyncBailHook(['a', 'b'])

SyncBailHook.tap('a', function(a, b) {
  if (a > b) {
    console.log('a > b');
    return a
  }
})

SyncBailHook.tap('b', function(a, b) {
  if (a < b) {
    console.log('a < b');
    return a
  }
})

SyncBailHook.call(1, 2)



//a不返回undefied，则返回值为新的参数，传到b执行，否则继续将a的参数传到b执行
const SyncWaterfallHook = new tapable.SyncWaterfallHook(['a', 'b', 'c'])

SyncWaterfallHook.tap('a', function(a, b) {
  console.log('a', a, b);
  if (a > b) {
    console.log('a > b', a, b);
    return (7, 5)
  }
})

SyncWaterfallHook.tap('b', function(a, b) {
  console.log('b', a, b);
  if (a > b) {
    console.log('a > b', a, b);
    return [5, 6]
  }
})

SyncWaterfallHook.call(2, 3)
SyncWaterfallHook.call(4, 3)


//如果a的返回值不是undefined，就一直走下去，不会跳到b中
const SyncLoopHook = new tapable.SyncLoopHook(['a', 'b'])
SyncLoopHook.tap('a', function(a,b) {
  console.log('a', a,b)
  if (a > b) {
    return true
  }
})

SyncLoopHook.tap('b', function(a,b) {
  console.log('b', a,b)
})
SyncLoopHook.call(4,1)



//AsyncParallelHook异步的顺序并行执行，使用tapAsync则会多个done回掉函数，但是回掉函数每触发一次钩子，则只会执行一次

//AsyncSeriesHook异步的顺序串行执行，和并行执行的区别在于，如果三个事件a，b,c，需要时间1，2，3秒
//则串行总共时间6秒左右，并行则为3秒左右。串行b会等待a执行done或者resolve才会接着往下执行。并行则不会
//串行如果done返回不是undeined则不执行b，或者走reject也不会执行b

const AsyncParallelHook = new tapable.AsyncParallelHook(['a', 'b'])
AsyncParallelHook.tapAsync('a', function(a,b, done) {
  console.log('a', a,b);
  setTimeout(() => {
    console.log('a setTimeout', a,b);
    done('a')
  },200)
})
AsyncParallelHook.tapAsync('b', function(a,b, done) {
  console.log('b', a,b);
  setTimeout(() => {
    console.log('b setTimeout', a,b);
    done('b')
  },100)
})
AsyncParallelHook.callAsync(1,3, (a) => {
  console.log('iam complete', a);
})

AsyncParallelHook.callAsync(5,6, (a) => {
  console.log('iam complete', a);
})



//异步的顺序并行执行，使用tapPromise则需要返回一个promise
const asyncParallelHook = new tapable.AsyncParallelHook(['a', 'b'])

asyncParallelHook.tapPromise("1", (name, age) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("1", name, age, new Date());
            resolve("1");
        }, 1000);
    });
});

asyncParallelHook.tapPromise("2", (name, age) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("2", name, age, new Date());
            resolve("2");
        }, 2000);
    });
});

asyncParallelHook.tapPromise("3", (name, age) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("3", name, age, new Date());
            resolve("3");
        }, 3000);
    });
});
asyncParallelHook.promise("panda", 18).then(ret => {
    console.log(ret);
});



//如果a返回值为undefined则继续执行b
const AsyncParallelBailHook = new tapable.AsyncParallelBailHook(['a', 'b'])

AsyncParallelBailHook.tapAsync('a', function(a,b, done) {
  console.log(a,b, 'a', 1);
  setTimeout(() => {
    console.log(a,b, 'a', 2);
    if (a > b) {
      done('a')
      return a
    }
  })
})

AsyncParallelBailHook.tapAsync('b', function(a,b, done) {
  console.log(a,b, 'b', 1);
  setTimeout(() => {
  console.log(a,b, 'b', 2);
    if (a < b) {
      done('b')
      return a
    }
  })
})
AsyncParallelBailHook.callAsync(6,3, function(a) {
  console.log(a);
})



const AsyncSeriesWaterfallHook = new tapable.AsyncSeriesWaterfallHook(['a', 'b'])
AsyncSeriesWaterfallHook.tapAsync('a', (a ,b, done) => {
  console.log(a, b, 'a', 2);
  setTimeout(() => {
    console.log(a, b, 'a', 1);
    done(undefined)
  }, 1000)
  return (1, 4)
})
AsyncSeriesWaterfallHook.tapAsync('b', (a ,b, done) => {
  console.log(a, b, 'b', 2);
  setTimeout(() => {
    console.log(a, b, 'b', 1);
    done()
  })
})
AsyncSeriesWaterfallHook.callAsync(1,2, (a) => {
  console.log('complete', 1);
})


const AsyncSeriesWaterfallHook = new tapable.AsyncSeriesWaterfallHook(['a', 'b'])
AsyncSeriesWaterfallHook.tapPromise('a', (a ,b) => {
  return new Promise((resolve , reject) => {
    console.log(a, b, 'a', 2);
    setTimeout(() => {
      console.log(a, b, 'a', 1);
      a = 2
      b = 3
      reject(null)
    }, 1000)
  })
})
AsyncSeriesWaterfallHook.tapPromise('b', (a ,b) => {
  return new Promise((resolve , reject) => {
    console.log(a, b, 'b', 2);
    setTimeout(() => {
      console.log(a, b, 'b', 1);
      resolve(1)
    }, 1000)
  })
})
AsyncSeriesWaterfallHook.promise(1,2).then(res => {
  console.log('complete', res);
})
```

