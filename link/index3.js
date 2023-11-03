window.abc = 1234


const img = document.createElement('img')
img.src = 'https://timage.lizihang.com/group1/M00/5E/53/Cgp8R10r2HqEZ7rOAAAAAHJLRc8588.jpg.3540x1680.jpg'

setTimeout(() => {
  document.body.appendChild(img)
}, 10000)