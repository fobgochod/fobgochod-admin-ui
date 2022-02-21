function byteSwitch(byte) {
    let size = ''
    if (byte < 0.1 * 1024) {
        //小于0.1KB，则转化成B
        size = byte.toFixed(2) + 'B'
    } else if (byte < 0.1 * 1024 * 1024) {
        //小于0.1MB，则转化成KB
        size = (byte / 1024).toFixed(2) + 'KB'
    } else if (byte < 0.1 * 1024 * 1024 * 1024) {
        //小于0.1GB，则转化成MB
        size = (byte / (1024 * 1024)).toFixed(2) + 'MB'
    } else {
        //其他转化成GB
        size = (byte / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
    }

    let sizeStr = size + '' //转成字符串
    let index = sizeStr.indexOf('.') //获取小数点处的索引
    let dou = sizeStr.substr(index + 1, 2) //获取小数点后两位的值
    if (dou === '00') {
        //判断后两位是否为00，如果是则删除00
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    }
    return size
}

function toTreeData(data) {
    let result = data.reduce(function (prev, item) {
        prev[item.parentId] ? prev[item.parentId].push(item) : (prev[item.parentId] = [item])
        return prev
    }, {})
    for (let prop in result) {
        result[prop].forEach(function (item) {
            result[item.id] ? (item.children = result[item.id]) : ''
        })
    }
    return result[0]
}

function dataToTree(data) {
    let pos = {}
    let tree = []
    let i = 0
    while (data.length !== 0) {
        if (data[i].parentId === '0') {
            tree.push({
                id: data[i].id,
                label: data[i].name,
                parentId: data[i].parentId,
                children: [],
                readData: data[i],
            })
            pos[data[i].id] = [tree.length - 1]
            data.splice(i, 1)
            i--
        } else {
            let posArr = pos[data[i].parentId]
            if (posArr !== undefined) {
                let obj = tree[posArr[0]]
                for (let j = 1; j < posArr.length; j++) {
                    obj = obj.children[posArr[j]]
                }
                obj.children.push({
                    id: data[i].id,
                    label: data[i].name,
                    parentId: data[i].parentId,
                    children: [],
                    readData: data[i],
                })
                pos[data[i].id] = posArr.concat([obj.children.length - 1])
                data.splice(i, 1)
                i--
            }
        }
        i++
        if (i > data.length - 1) {
            i = 0
        }
    }
    let top = []
    top.push({
        id: '0',
        label: '虚拟根目录(Root)',
        parentId: '0',
        children: tree,
    })
    return top
}

function dateToStr(date) {
    if (date && date instanceof Date) {
        return date.format('Y-m-d H:i:s')
    }
    return date
}

function dateTo(date) {
    if (date && date instanceof Date) {
        return date.format('Y-m-d')
    }
    return date
}

export default {
    byteSwitch,
    toTreeData,
    dataToTree,
    dateToStr,
    dateTo,
}
