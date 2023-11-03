let obj = {
  _name: 'aaaa'
}


Object.defineProperty(obj, 'name3', {
  configurable: true,
  enumerable: true,
  writable: true,
  value: '1234'
})

Object.defineProperties(obj, {
  '_name': {
    get: function() {
      return '1234444'
    }
  },
  'name3': {
    get: function() {
      return this._name
    },
    set: function(val) {
      this._name = val
    }
  },
  'name': {
    // value: 'aaaa',
    // writable: true,
    enumerable: true,
    configurable: true,
    get: function() {
      return this._name
    },
    set: function(val) {
      this._name = val
    }
  },
  'name2': {
    value: 'aaaa',
    writable: true,
    enumerable: true,
    configurable: true
  }
})
console.log(obj.name3)
console.log('_name', Object.getOwnPropertyDescriptor(obj, '_name'))
console.log('name', Object.getOwnPropertyDescriptor(obj, 'name'))
console.log('name2', Object.getOwnPropertyDescriptor(obj, 'name2'))
console.log('name3', Object.getOwnPropertyDescriptor(obj, 'name3'))