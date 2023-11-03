#### promise resolve另外一个primose

```js
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2.then(result => console.log(result))
  .catch(error => console.log(error))
// Error: fail

// p2的promise resolve的是另外一个promise p1，所以，p2的最终状态是由p1决定的。虽然p2resolve了，但是p1的状态是reject，所以最终走到了catch
```



#### resolve后面的代码也会执行，并且先于resolve执行

```js
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
// 这里会先打印2，后打印1。虽然resolve后面的代码会执行，但是这样写不太好。resovle应该是promise截止处。加个return即可实现

new Promise((resolve, reject) => {
  return resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 1
```



#### promise状态变化只会有一次，如果变成了resovled，后期在变成rejected是不会被捕获到的

```js
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test'); // 等同于 reject(new Error('test'))
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
// 这里已经resolve了.所以后面的报错是不会再被捕获到


const promise = new Promise(function(resolve, reject) {
 	setTimeout(() => {
    resolve('ok');
  })
  throw new Error('test'); // 等同于 reject(new Error('test'))
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// error
// 这里error是先执行的，所以会走到catch
```





#### Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个`catch`语句捕获。

```js
getJSON('/post/1.json').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});
```



#### then的第二个参数只是接受promise的错误，catch则是promise和当前这个catch之前（之前的then和catch（catch也能抛出错误））的错误。

```js
someAsyncThing().then(function() {
  return someOtherAsyncThing();
}).catch(function(error) {
  console.log('oh no', error);
  // 下面一行会报错，因为y没有声明
  y + 2;
}).catch(function(error) {
  console.log('carry on', error);
});
// 第二个catch捕获了第一个catch的错误，如果没有第二个catch，则该错误不会被捕获到
```



#### finally无论成功，失败都执行的函数，没有参数

```js
promise
.finally(() => {
  // 语句
});

// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);
```



#### Promise.all是所有都resolve才then，有一个reject，就catch



### promise.all如果其中有promise自己定义了catch，当该promise走rejected时，只会走到该promise的catch，而promise.all不走catch

```js
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// ["hello", Error: 报错了]
```



#### promise.race

```js
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);

p
.then(console.log)
.catch(console.error);
// 5秒内，没有返回结果，就reject
```



#### promise.try实现

```js
Promise.reslove().then(fn)
// 这种写法有弊端，会将fn执行时间延后

(async () => f())()

(
  () => new Promise(
    resolve => resolve(f())
  )
)();
```

