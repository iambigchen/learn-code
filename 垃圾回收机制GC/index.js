function a () {
    return new Promise((resolve, reject) => {
        resolve(1)
        console.log('-----after----')
        throw(new Error(1))
    })
}

a().then(a => {
    console.log('---------', a)
}).catch(e => {
    console.log('----e-----', e)
})