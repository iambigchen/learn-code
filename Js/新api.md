用户是否可见api

```js
document.hidden.     表示页面是否隐藏的布尔值。页面隐藏包括页面在后台标签页或者浏览器最小化

document.visibilityState.   有四种可能状态值

visibilitychange 事件 文档从不可见变可见，或者从可见变为不可见触发


	
```



地理位置

```js
navigator.geolocation.getCurrentPosition(function(e){
  console.log(e)
}, errFn, {
  enableHighAccuracy: true, // 是否精确的位置
  timeout: 500, //最长等待时间
  maximumAge: 25000 // 上一次取得坐标信息的有效时间
})

// 跟踪用户位置信息
var watchId = navigator.geolocation.watchPosition(function() {
  
})
clearWatch(watchId)

获取的坐标不能直接应用在百度地图上，需要转换一下
navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    const pointBak = new BMap.Point(lng, lat);
    const convertor = new BMap.Convertor();
    convertor.translate([pointBak], 1, 5,function(resPoint) {
        if(resPoint && resPoint.points && resPoint.points.length>0){
            lng = resPoint.points[0].lng;
            lat = resPoint.points[0].lat;
        }
        const point = new BMap.Point(lng, lat);
        const geo = new BMap.Geocoder();
        geo.getLocation(point, (res) => {

        });
    });
});、
```





file

```js
change事件，监听文件是否有改变

FileReader类型
var reader = new FileReader()
reader.readAsText() 以纯文本形式读取文件，将文本内容保存在result属性中
reader.readAsDataURL() 读取文件以数据uri形式保存在result中
reader.readAsBinaryString() 以字符串保存
reader.readAsArrayBuffer() 以ArrayBuffer保存

reader.onprogress(function(){}) 读取新数据，每50ms触发一次
reader.onerror() 读取失败事件
reader.onload() 读完整个文件

读取部分内容
slice()

对象URL
指引用保存在file或blob数据中的URL。好处是不必把文件内容读取到js，而是直接使用文件内容
window.URL.createObjectURL()
释放URL。 window.URL.revokeObjectURL（）
```



web计时

```js
performance.timing
```

