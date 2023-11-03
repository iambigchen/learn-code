class Scheduler {
    constructor(maxNum) {
      this.taskList = [];
      this.count = 0;
      this.maxNum = maxNum;
    }
    async add(promiseCreator) {
      if (this.count >= this.maxNum) {
        await new Promise((resolve) => {
          this.taskList.push(resolve)
        })
      }
      this.count ++;
      const result = await promiseCreator();
      this.count --;
      if (this.taskList.length > 0) {
        this.taskList.shift()();
      }
      return result;
    }
  }
  
  const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time)
  })
  const scheduler = new Scheduler(2);
  const addTask = (time, val) => {
    scheduler.add(() => {
      return timeout(time).then(() => {
        console.log(val)
      })
    })
  }  

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')