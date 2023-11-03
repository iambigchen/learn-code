const http = require('http')
const zlib = require("zlib")
const fs = require("fs")
const path = require("path")
const crypto = require("crypto")
const app = http.createServer((req, res) => {
  let {url: allurl ,method} = req
  let [url, query] = allurl.split('?')
  res.setHeader('Access-Control-Request-Methods', 'POST, GET, OPTIONS, PUT')
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8002')
  res.setHeader('Access-Control-Allow-Headers', 'AA')
  console.log(url, method);
  if (method === 'OPTIONS') {
    return res.end()
    // return res.statusCode = 200
  }
  if (url === '/postTest' && method === 'POST') {
    return res.end('1')
  }
  if (url === '/' && method === 'GET') {
    // gzip压缩
    const acceptEncoding = req.headers['accept-encoding']
    const filePath = path.resolve(__dirname, 'index.html')
    const raw = fs.createReadStream(filePath)
    if (acceptEncoding.includes('gzip')) {
      res.setHeader('Content-Encoding', 'gzip')
      raw.pipe(zlib.createGzip()).pipe(res)
    } else {
      raw.pipe(res)
    }
  }

  if (url === '/12.png' && method === 'GET') {
    if (req.headers['if-modified-since']) {
      res.statusCode = 304
      res.end()
    } else {
      // gzip压缩
      // res.setHeader('Expires', 'Wed Apr 29 2020 11:30:00 GMT')
      // res.setHeader('cache-control', 'public, max-age=30, s-maxage=0')
      res.setHeader('cache-control', 'no-cache')
      res.setHeader('Last-Modified', 'Wed Apr 29 2020 11:52:00 GMT')
      const filePath = path.resolve(__dirname, '12.png')
      const raw = fs.createReadStream(filePath)
      raw.pipe(res)
    }
  }

  if (url === '/123.png' && method === 'GET') {
    const filePath = path.resolve(__dirname, '12.png')
    const raw = fs.createReadStream(filePath)
    const md5 = crypto.createHash('md5')
    raw.on('data', (data) => {
      md5.update(data)
    })
    raw.on('end', () => {
      let etag = md5.digest('hex')
      if (etag === req.headers['if-none-match']) {
        res.statusCode = 304
        res.end()
        return
      }
      res.setHeader('ETag', etag)
      raw.pipe(res)
    })
  }

  if (url === '/api/accept' && method === 'GET') {
    res.setHeader('Content-Type', 'text/plain')
    res.end(query)
  }

  if (url === '/api/accept' && method === 'POST') {
    res.setHeader('Content-Type', 'text/plain')
    res.end(query)
  }
  if (url === '/api/accept' && method === 'PUT') {
    res.end(query)
  }
})

app.listen(8001, () => {
  console.log('listen in 8001');
})