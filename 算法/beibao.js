let arr = []
function knapsack(weights, values, num) {
  let other = 0
  let big = 0
  let newWeights = [...weights]
  let newValue = [...values]
  for(let i = 0; i < newWeights.length; i++) {
    let bigVal = 0
    const weight = newWeights[i]
    const val = newValue[i]
    other = num - weight
    weights.splice(i, 1)
    values.splice(i, 1)
    if (other >= 0) {
      bigVal = knapsack(weights, values, other)
    }
    if (other >= 0 && (bigVal + val > big || big === 0)) {
      arr.push(weight)
      big = bigVal + val
    }
  }
  return big
}

console.log(knapsack([3,4,5], [2,3,4], 7), arr)
