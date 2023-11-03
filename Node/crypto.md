### 1. `Hash`类的创建：`crypto.createHash(algorithm)`

创建一个`Hash`类使用方法：`crypto.createHash(algorithm)`，其参数`algorithm`取决与平台上所安装的 OpenSSL 版本所支持的算法，如：`'sha1'`、`'md5'`、`'sha256'`、`'sha512'` 等



### 2. 使用`Hash`类计算哈希值

​	可以使用`hash.update()`将计算数据以流的方式写入，流输入结束，使用`hash. digest()`方法计算数据的`hash`值

