## bind

```js
Function.prototype.bind2 = function (context, ...args) {
    var self = this;
    var fNOP = function () {};
    function fBound(...args2) {
        return self.call(this instanceof fBound ? this : context, ...args, ...args2);
    }
    fNOP.prototype = this.prototype
    fBound.prototype = new fNOP()
    return fBound
}
```