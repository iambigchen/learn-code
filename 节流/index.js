function throttle (fn, wait) {
    var flag = true
    return function () {
        let args = arguments
        if (flag) {
            flag = false
            setTimeout(() => {
                fn.apply(this, args)
                flag = true
            }, wait)
        }
    }
}