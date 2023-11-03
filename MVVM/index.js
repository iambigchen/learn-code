function Mvvm (options = {}) {
    this.$options = options
    let data = options.data
    this._data = observe(data)

    this._vm = new Proxy(this, {
        get (target, key, receiver) {
            if (key in target) return Reflect.get(target, key, receiver)
            if (key in target._data) return Reflect.get(target._data, key, receiver)
        },
        set (target, key, value, receiver) {
            return Reflect.set(target._data, key, value, receiver)
        }
    })
    return this._vm
    // for(let key in data) {
    //     Object.defineProperty(this, key, {
    //         configurable: true,
    //         enumerable: true,
    //         get () {
    //             console.log('---------', 'get Data')
    //             return this._data[key]
    //         },
    //         set(val) {
    //             this._data[key] = val
    //         }
    //     })
    // }

    // new Compile(this.$options.el, this)
}

function hasChange (old, val) {
    return old !== val
}

function Observe (data) {
    return new Proxy(data, {
        get (target, key, receiver) {
            let res = Reflect.get(target, key, receiver)
            if (typeof res === 'object' ) {
                return Observe(res)
            }
            return res
        },
        set (target, key, value, receiver) {
            const oldVal = target[key]
            const result = Reflect.set(target, key, value, receiver)
            if (hasChange(oldVal, value)) {
                console.log('---------', 123)
            }
            return result
        },
        apply () {
            console.log('---------', 1)
        }
    })
    // for(let key in data) {
    //     let val = data[key]
    //     observe(val)

    //     Object.defineProperty(data, key, {
    //         configurable: true,
    //         enumerable: true,
    //         get() {
    //             return val
    //         },
    //         set(newVal) {
    //             console.log('---------', 'set')
    //             if (newVal === val) {
    //                 return val
    //             }
    //             val = newVal
    //         }
    //     })
    // }
}

function observe (data) {
    if (!data || typeof data !== 'object') return;
    return new Observe(data);
}