encodeURI,encodeURIComponent,decodeURI,decodeURIComponent都是在global下的方法

encodeURI对整个url进行编码，不会对url的特殊字符进行编码，如`:/?#`等

encodeURIComponent对url的某一段进行编码，会对url的特殊字符进行编码

