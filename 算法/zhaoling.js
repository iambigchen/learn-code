let coins = [1,2,5,10]

let cache = {}
function coinsChange(num) {
  let other = 0
  let arr = []
  let coin
  if (cache[num]) {
    return cache[num]
  }
  for (let i = 0; i < coins.length; i++) {
    let min = []
    coin = coins[i]
    other = num - coin
    if (other >= 0) {
      min = coinsChange(other)
    }
    if (other >= 0 && ((min.length + 1) < arr.length || arr.length === 0)) {
      arr = [...min, coin]
    }
  }
  cache[num] = arr
  return arr
}

console.log(coinsChange(27))
