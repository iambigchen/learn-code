let A = [3,2,1],
B = [],
C = []
let step = 0
function handler(num, from, to, mid) {
  if (num > 0) {
    handler(num-1, from, mid, to)
    step++
    to.push(from.pop())
    handler(num-1, mid, to, from)
  }
}
handler(3, A, B, C)

console.log(step);