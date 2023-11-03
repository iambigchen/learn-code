function mockSync () {
    return Promise.resolve(1)
}

async function myFetch() {
    await mockSync()
}
  
myFetch();

export default class Person {
    constructor({ name }) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}