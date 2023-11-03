#### puppeteer.launch

options

1. ignoreHTTPSErrors 忽略https错误 默认是 `false`

2. headless 以无头模式运行浏览器，默认true，除非devtools为true

3. executablePath 可运行 Chromium 或 Chrome 可执行文件的路径，而不是绑定的 Chromium

4. slowMo 将 Puppeteer 操作减少指定的毫秒数

5. defaultViewport  为每个页面设置一个默认视口大小。默认是 800x600。如果为 `null` 的话就禁用视图口。

   ​	defaultViewport.width 宽

   ​	defaultViewport.height	高

   ​	defaultViewport.isMobile 是否在页面中设置了 `meta viewport` 标签。默认是 `false`

   ​	defaultViewport.deviceScaleFactor 设置设备的缩放（可以认为是 dpr）。默认是 `1`

   ​	defaultViewport.hasTouch 指定viewport是否支持触摸事件 默认是 `false`

   ​	defaultViewport.isLandscape 指定视口是否处于横向模式。默认是 `false`

6. args 传递给浏览器实例的其他参数

7. timeout 等待浏览器实例启动的最长时间（以毫秒为单位）。默认是 `30000` (30 秒). 通过 `0` 来禁用超时。

8. dumpio 是否将浏览器进程标准输出和标准错误输入到 `process.stdout` 和 `process.stderr` 中。默认是 `false`。

9. env 指定浏览器可见的环境变量。默认是 `process.env`。

10. devtools 是否为每个选项卡自动打开DevTools面板 如果这个选项是 `true`，`headless` 选项将会设置成 `false`。