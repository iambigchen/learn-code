function deep(from, to = {}) {
  const toString = Object.prototype.toString
  if (typeof from !== 'object') {
    return to = from
  }
  for (const key in from) {
    if (from.hasOwnProperty(key)) {
      const element = from[key]
      const type = toString.call(element)
      if (type === '[Object Array]') {
        let arr = []
        element.forEach(e => {
          arr.push(deep(e))
        })
        to[key] = arr
      } else if (type === '[Object Object]') {
        let obj = {}
        for (const key2 in element) {
          if (element.hasOwnProperty(key2)) {
            const ele = element[key2];
            obj[key2] = deep(ele)
          }
        }
        to[key] = obj
      } else {
        to[key] = element
      }
    }
  }
  return to
}
const obj = {
  arr: [1,2,3],
  child: {
    arr2: [
      {
        a: 1
      },
      {
        b: 2
      }
    ]
  }
}
let a = {
  age: 1,
  jobs: {
    first: "FE"
  },
  schools: [
    {
      name: 'shenda'
    },
    {
      name: 'shiyan'
    }
  ],
  arr: [
    [
      {
        value: '1'
      }
    ],
    [
      {
        value: '2'
      }
    ],
  ]
}
console.log(JSON.stringify(deep(obj)))
console.log(JSON.stringify(deep(a)))