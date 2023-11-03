null 和 undefined没有toString方法，当不知道转化的值是不是null和undefined时，可以用String。

String(null).  'null'

String(undefined).  'undefined'



Number.toString(基数)

对于数字类型，可以用toString加基数，转化为几进制的字符串