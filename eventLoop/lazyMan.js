function LazyMan(name) {
  if (!(this instanceof LazyMan)) {
    const lazyMan = new LazyMan(name)
    console.log(name)
    return lazyMan
  }
  this.name = name
  this.subs = []
  this.sleep = function (time) {
    this.subs.push(() => {
      setTimeout(() => {
        this.next()
      }, time * 1000)
    })
    return this
  }
  this.eat = function (food) {
    this.subs.push(() => {
      console.log(food)
      this.next()
    })
    return this
  }
  this.next = function () {
    if (!this.subs) {return}
    const current = this.subs.shift()
    current ? current.call(this) : null
  }
  this.sleepFirst = function (time) {
    this.subs.unshift(() => {
      setTimeout(() => {
        this.next()
      }, time * 1000)
    })
    return this
  }
  setTimeout(() => {
    this.next()
  })
}
LazyMan('Tony').eat('lunch').sleep(2).eat('dinner').sleepFirst(5)