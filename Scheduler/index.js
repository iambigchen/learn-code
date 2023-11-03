class Scheduler {
    constructor (maxNum = 2) {
        this.maxNum = maxNum
        this.task = []
        this.num = 0
    }
    async add(promiseCreator) {
        if (this.num >= this.maxNum) {
            await new Promise((resolve) => {
                this.task.push(resolve)
            })
        }
        this.num++
        let res = await promiseCreator()
        this.num--
        if (this.num < this.maxNum && this.task.length) {
            this.task.shift()()
        }
        return res
    }
}
const timeout = (time) => new Promise(resolve => {  setTimeout(resolve, time)})
const scheduler = new Scheduler(2)
const addTask = (time, order) => {  
    scheduler.add(() => timeout(time)).then(() => console.log(order))
}
addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
// output: 2 3 1 4
// 一开始，1、2两个任务进入队列// 500ms时，2完成，输出2，任务3进队// 800ms时，3完成，输出3，任务4进队// 1000ms时，1完成，输出1// 1200ms时，4完成，输出4