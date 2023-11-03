```js
var a = [1]
Array.prototype.isPrototypeOf(a) // true

Object.prototype.toString.call(a) // [object Array]

a.constructor == Array // true
```



> jq中isArray实现

```js
isArray: Array.isArray || function( obj ) {
    return jQuery.type( obj ) === "array";
},
type: function( obj ) {
    if ( obj == null ) {
        return obj + "";
    }
    // jquery做了如下转换：
    //    class2type[ "[object " + name + "]" ] = name.toLowerCase();
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[ toString.call( obj ) ] || "object" :
        typeof obj;
}
```

