function debounce (fn) {
    var timeout
    return function () {
        if (timeout) {
            clearTimeout(timeout)
        }
        let self = this
        let args = arguments
        timeout = setTimeout(function () {
            fn.apply(self, args)
        }, 300)
    }
}
