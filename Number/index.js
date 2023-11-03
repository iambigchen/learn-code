Number.prototype.add = function(n) {
  this.valueOf = function() {
    return 1
  }
  this.toString = function() {
    return 2
  }
  return this + n
}
console.log((2).add(1))