let arr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
]

let res = []
let map = {}

for(let i = 0; i < arr.length; i++) {
    map[arr[i].id] = {...arr[i], childs:[]}
}


for(let i = 0; i < arr.length; i++) {
    let {id, pid} = arr[i]
    if (map[pid]) {
        map[pid].childs.push(map[id])
    } else {
        map[pid] = {
            childs: [map[id]]
        }
    }
    if (pid === 0) {
        res.push(map[id])
    }
}

console.log(res)