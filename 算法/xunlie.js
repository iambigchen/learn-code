function lcs(x, y) {
  x = [...x]
  y = [...y]
  let l = []
  for (let i = 0; i < x.length; i++) {
    l[i] = []
    for (let j = 0; j < y.length; j++) {
      l[i][j] = 0
    }
  }
  let word_x, word_y
  for (let i = 0; i < x.length; i++) {
    for (let j = 0; j < y.length; j++) {
      word_x = x[i]
      word_y = y[j]
      let a = j > 0 ?  l[i][j-1] : 0
      let b = i > 0 ? l[i-1][j] : 0
      if (word_x == word_y) {
        l[i][j] = Math.max(a, b) + 1
      } else {
        l[i][j] = Math.max(a, b)
      }
    }
  }
  return l[x.length-1][y.length-1]
}

console.log(lcs('abcadf', 'acbad'))