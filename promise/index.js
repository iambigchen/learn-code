const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()
      throw new Error('error!!!')
    }, 1000)
  })



  promise1.then(res => {
    // throw new Error('error23!!!')
  }).catch(e => {})