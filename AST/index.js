const path = require('path')
const fs = require('fs-extra')
const htmlparser = require('htmlparser2') 
const jsparse = require('@babel/parser').parse;
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const template = require("@babel/template").default;
const t = require("@babel/types");

/**
 * 转换入口函数
 * @param {*} sourcePath 需要转换的项目目录
 * @param {*} targetPath 转换后存放的目录
 */
function transform (sourcePath, targetPath) {
    global.sourcePath = sourcePath
    global.targetPath = targetPath
    global.file = {}
    folderHandle(sourcePath, targetPath)
}

/**
 * 项目目录处理
 * @param {*} sourcePath 需要转换的项目目录
 * @param {*} targetPath 转换后存放的目录
 */
function folderHandle (sourcePath, targetPath) {
    // 判断如果转换后存放的目录已经有了，删除
    if (fs.existsSync(targetPath)) {
        fs.removeSync(targetPath)
    }
    // 创建转换后存放的目录
    fs.mkdirSync(targetPath)

    // 读取转换的项目目录
    fs.readdir(sourcePath, function (err, files) {
        // 获取项目目录的数量，用来判断是否已经转换完成
        const fileLength = files.length
        let count = 1
        // 遍历项目文件
        files.forEach(fileName => {
            var filePath = path.join(sourcePath, fileName)
            const newFilePath = path.join(targetPath, fileName)
            fs.stat(filePath, function (err, stats) {
                // 如果是文件夹，递归处理文件夹
                if (stats.isDirectory()) {
                    folderHandle(filePath, newFilePath)
                } else {
                    // project.config.json文件不处理，直接拷贝
                    if (fileName === 'project.config.json') {
                        fs.copySync(filePath, newFilePath)
                    } else {
                        // 对文件的处理
                        filesHandle(filePath, targetPath, () => {
                            count++
                            if (count === fileLength) {
                                for (const key in global.file) {
                                    if (Object.hasOwnProperty.call(global.file, key)) {
                                        if (key === 'app' && !global.file[key].html) {
                                            global.file[key].html = "<template>\r\n  <div id='app'>\r\n    <router-view />\r\n  </div>\r\n</template>\r\n"
                                        }
                                        fs.writeFile(global.file[key].targetPath, `${global.file[key].html}\r\n${global.file[key].js}\r\n${global.file[key].css}\r\n `)
                                    }
                                }
                            }
                        })
                    }
                }
            })
        })
    })
}

/**
 * 文件处理
 * @param {*} filePath 文件路径
 * @param {*} targetPath 转换后的文件目录
 * @param {*} cb 转换成功后的回掉函数
 */
function filesHandle (filePath, targetPath, cb) {
    const extname = path.extname(filePath)
    const basename = path.basename(filePath)
    const fileNameNoExt = path.basename(filePath, extname)
    const dirname = path.dirname(filePath)
    // 生成唯一的key，防止不同文件夹里，有文件名相同
    const fileKey = path.join(path.relative(global.sourcePath, dirname), fileNameNoExt)
    if (!global.file[fileKey]) {
        global.file[fileKey] = {}
    }
    // 目标文件路径
    if (fileKey === 'app') {
        global.file[fileKey].targetPath = path.join(targetPath, 'App.vue')
    } else {
        global.file[fileKey].targetPath = path.join(targetPath, fileNameNoExt+'.vue')
    }
    switch (extname) {
        case '.wxss':
            cssHandle()
            break;
        case '.wxml':
            htmlHandle()
            break;
        case '.js':
            jsHandle()
            break;
        default:
            const newFilePath = path.join(targetPath, basename)
            fs.copySync(filePath, newFilePath)
            break;
    }
    // css处理 只简单的包了<style>标签
    function cssHandle () {
        const fileData = fs.readFileSync(filePath, 'utf8')
        const fileVueData = `<style scoped>\r\n${fileData}\r\n</style>\r\n`
        global.file[fileKey].css = fileVueData
        cb()
    }
    // js处理
    function jsHandle () {
        const fileData = fs.readFileSync(filePath, 'utf8')
        const jsAsts = parserJS(fileData)
        const fileVueData = traverseJS(jsAsts);
        global.file[fileKey].js = fileVueData
        cb()
    }
    // html处理
    async function htmlHandle () {
        const fileData = fs.readFileSync(filePath, 'utf8')
        const htmlAsts  = await parserHtml(fileData)
        const templateStr = astToString(htmlAsts)
        const htmlStr = `<template>\r\n${templateStr.trim()}\r\n</template>\r\n\r\n`;
        global.file[fileKey].html = htmlStr
        cb()
    }

    
}

// 将html的ast转成拼接成字符串
function astToString (htmlAsts) {
    let str = ''
    htmlAsts.forEach(item => {
        if (item.type === 'text') {
            str += item.data
        } else if (item.type === 'tag') {
            const name = item.name === 'image' ? 'img': 'div'
            str += '<' + name
            if (item.attribs) {
                Object.keys(item.attribs).forEach(attr => {
                    let value = item.attribs[attr];
                    // 对if elseif else for处理
                    if (attr.includes('wx:')) {
                        switch (attr) {
                            case 'wx:if':
                                str += ` v-if="${value.replace('{{', '').replace('}}', '')}"`;
                                break;
                            case 'wx:elif':
                                str += ` v-else-if="${value.replace('{{', '').replace('}}', '')}"`;
                                break;
                            case 'wx:else':
                                str += ` v-else`;
                                break;
                            case 'wx:key':
                                str += ` :key='${value}'`;
                                break;
                            case 'wx:for':
                                let forItem = 'item'
                                if (item.attribs['wx:for-item']) {
                                    forItem = item.attribs['wx:for-item']
                                }
                                str += ` v-for="(${forItem}) in ${value.replace('{{', '').replace('}}', '')}"`;
                                break;
                            default:
                                break;
                        }
                    } else if (attr.includes('bindtap')) {
                        // 对bindtap处理
                        str += ` @click="${value}"`;
                    } else if (attr === 'class') {
                        // 把所有小程序自己标签改成div，并生成对应的class
                        str += ` ${item.attribs[attr].includes('{{') ? ':' : ''}${attr}="_${item.name} ${value.replace('{{', '').replace('}}', '')}"`;
                    } else {
                        str += ` ${item.attribs[attr].includes('{{') ? ':' : ''}${attr}="${value.replace('{{', '').replace('}}', '')}"`;
                    }
                })
            }
            str += '>';
            if (item.children && item.children.length) {
                str += astToString(item.children);
            }
            str += `</${name}>`;
        } else if (item.type == "comment") {
            str += `<!--${item.data}-->`;
        }
    })
    return str
}

// 利用htmlparser2插件，将html文件转成ast
function parserHtml(fileData) {
    return new Promise((resolve, reject) => {
        const handler = new htmlparser.DomHandler((error, dom) => {
        if (error) {
            reject(error);
        } else {
            //在回调里拿到AST对象
            resolve(dom);
        }
        });
        //再初始化一个解析器
        const parser = new htmlparser.Parser(handler, {
        xmlMode: true,
        //将所有标签小写，并不需要，设置为false, 如果xmlMode禁用，则默认为true。所以xmlMode为true。
        lowerCaseTags: false,
        //自动识别关闭标签，并关闭，如<image /> ==> <image></image>,不加的话，会解析异常，导致关闭标签会出现在最后面
        recognizeSelfClosing: true,
        });
        //再通过write方法进行解析
        parser.write(fileData);
        parser.end();
    })
}

// 利用@babel/parser把js 转成ast
function parserJS (fileData) {
    let ast = jsparse(fileData)
    return ast
}

// 遍历js的ast
function traverseJS(ast) {
    let globalMethods = []
    let lifeCycle = []
    let methods = []
    let data = []
    traverse(ast, {
        VariableDeclarator (path) {
            // 对全局函数进行处理
            globalMethods.push(path)
            path.skip()
        },
        ExpressionStatement(path) {
            // 对全局函数进行处理
            if (t.isCallExpression(path.node.expression) && path.node.expression.callee.name !== 'App' && path.node.expression.callee.name !== 'Page') {
                globalMethods.push(path)
                path.skip()
            }
        },
        ObjectProperty (path) {
            // 对data
            if (t.isObjectProperty(path) && path.node.key.name === 'data') {
                data = path.node.value && path.node.value.properties ? path.node.value.properties : []
                path.skip()
            }
        },
        ObjectMethod(path) {
            // 对生命周期函数和methods函数进行处理
            const name = path.node.key.name;
            switch (name) {
                case 'onLaunch':
                case 'onLoad':
                case 'onShow':
                case 'onUnload':
                case 'onHide':
                    lifeCycle.push(path.node)
                    break;
                default:
                    methods.push(path.node)
                    break;
            }
            path.skip()
        }
    })

    const componentTemplate = `
    export default {
        data() {
            return DATA
        },
        life_default: '',
        methods: METHODS
    }
    `;

    // 利用@babel/template 模板生成新的ast
    const newast = template(componentTemplate)({
        DATA: t.objectExpression(data),
        METHODS: t.objectExpression(methods)
    })
    // 将life_default占位符替换成生命周期函数
    traverse(newast, {
        noScope: true,
        ObjectProperty(path) {
            const name = path.node.key.name;
            if (name === "life_default") {
                let lifeCycleArr = lifeCycle
                for (let key in lifeCycleArr) {
                    path.insertBefore(lifeCycleArr[key]);
                }
                //删除标记
                path.remove();
            }
        }
    })
    // 利用@babel/generator 把新模板生成的ast转成字符串code
    const code = generate(newast).code
    // 把全局函数的ast转成字符串code
    const precode = globalMethods.reduce((preValue, currentValue) => {
        return preValue + `${generate(currentValue.node, { retainFunctionParens: true }).code}\r\n`;
    }, '');
    return `<script>\r\n${precode}\r\n${code}</script>\r\n`
    
}

transform('/Users/admin/Documents/chenyu/babel/src', '/Users/admin/Documents/chenyu/babel/vue')