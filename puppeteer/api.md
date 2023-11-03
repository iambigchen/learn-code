#### 生成page和browser实例

```js
const browser = await puppeteer.launch();
const page = await browser.newPage();
```



#### page.setViewport

设置浏览器窗口大小和缩放比例

```js
await page.setViewport({
  width: 1200,
  height: 480,
  deviceScaleFactor: 1,
});
```



#### page.goto

跳转到某个页面

```js
await page.goto('https://www.lizihang.com');
```



#### page.screenshot

截屏

```js
await page.screenshot({path: 'example.png'});
```



#### page.pdf

以pdf格式保存

```js
await page.pdf({path: 'hn.pdf', format: 'A4'});
```



#### page.evaluate

控制台操作

```js
const dimensions = await page.evaluate(() => {
  console.log(`url is ${location.href}`)
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    deviceScaleFactor: window.devicePixelRatio,
    title: document.title,
    cookie: document.cookie
  };
});
```



#### page.on

监听事件

```js
page.on('console', msg => console.log('PAGE LOG:', msg.text()));
```

