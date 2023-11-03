var arr1 = [1, 2, 2, 1]
var arr2 = [2]

var set1 = new Set(arr1)
var set2 = new Set(arr2)

// 并集
var union = [...new Set([...arr1, ...arr2])]
console.log('并集', union)

// 交集
var intersect = [...arr1.filter(x => set2.has(x))]
console.log('交集', intersect)

// 差集
var diff = [...new Set(arr1.filter(x => !set2.has(x)))]
console.log('差集', diff)

const intersect2 = (nums1, nums2) => {
  const map = {}
  const res = []
  for (let n of nums1) {
    if (map[n]) {
      map[n]++
    } else {
      map[n] = 1
    }
  }
  for (let n of nums2) {
    if (map[n] > 0) {
      res.push(n)
      map[n]--
    }
  }
  return res
}
console.log('交集', intersect2(arr1, arr2))