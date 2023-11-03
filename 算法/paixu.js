let arr = []

function sort1(list) {
  return list.sort()
}
arr = [3,1,2,5,7,3,2]
console.log(sort1(arr))

function sort2(list) {
  for(let i = 0;  i< list.length; i++) {
    for(let j = i + 1; j< list.length; j++) {
      if (list[i] > list[j]) {
        [list[j], list[i]] = [list[i], list[j]]
        continue
      }
    }
  }
  return list
}
arr = [3,1,2,5,7,3,2]
console.log(sort2(arr))

function change(left, right) {
  let il = 0, ir = 0, result = []
  while(il < left.length && ir < right.length) {
    if (left[il] < right[ir]) {
      result.push(left[il++])
    } else {
      result.push(right[ir++])
    }
  }
  while(il < left.length) {
    result.push(left[il++])
  }
  while(ir < right.length) {
    result.push(right[ir++])
  }
  return result
}
function sort3(list) {
  if (list.length === 1) {
    return list
  }
  let mid = parseInt(list.length / 2)
  let left = list.slice(0, mid)
  let right = list.slice(mid, list.length)
  return change(sort3(left), sort3(right))
}
arr = [3,1,2,5,7,3,2]
console.log(sort3(arr))

function quick(arr, left, right) {
  if (left >= right) {
    return
  }
  let mid = arr[Math.floor((left + right) / 2)], l = left, r = right
  while(l <= r) {
    while (arr[l] < mid) {
      l++
    }
    while (arr[r] > mid) {
      r--
    }
    if (l <= r) {
      [arr[l], arr[r]] = [arr[r], arr[l]]
      l++
      r--
    }
  }
  quick(arr, left, l-1)
  quick(arr, l, right)
  return arr
}

function sort4(list) {
  let l = 0, r = list.length - 1
  return quick(list, l, r)
}
arr = [3,1,2,5,7,3,2]
console.log('sort4', sort4(arr))


function sort5(list) {
  if (list.length <= 1) {
    return list
  }
  let mid = list.splice(Math.floor((list.length) / 2), 1)
  let left = [], right = []
  list.forEach(e => {
    e > mid ? right.push(e) : left.push(e)
  })
  return [...sort5(left), ...mid, ...sort5(right)]
}
arr = [3,1,2,5,7,3,2]
console.log('sort5', sort5(arr))


function heapify(arr, i, length) {
  let left = i * 2 + 1
  let right = i * 2 + 2
  let largest = i
  if (left < length && arr[largest] < arr[left]) {
    largest = left
  }
  if (right < length && arr[largest] < arr[right]) {
    largest = right
  }
  if (largest !== i) {
    [arr[largest], arr[i]] = [arr[i], arr[largest]]
    heapify(arr, largest, length)
  }
}
function sort6(list) {
  let mid = Math.floor(list.length/2)
  let length = list.length
  for (mid; mid >= 0; mid--) {
    heapify(list, mid, list.length)
  }
  while(length > 1) {
    length--
    [arr[length], arr[0]] = [arr[0], arr[length]]
    heapify(list, 0, length)    
  }
  return list
}
arr = [3,1,2,5,7,3,2]
console.log('sort6', sort6(arr))
