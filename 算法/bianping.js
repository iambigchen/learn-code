var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10]

// var arr2 = arr.flat(Infinity)

// console.log(arr2);

function flatDeep(list, d = 1) {
  return d > 0 ? 
    list.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d-1) : val), [])
    : arr.slice()
}
var arr3 = flatDeep(arr, Infinity)

console.log(arr3);