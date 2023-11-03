const jsparse = require('@babel/parser').parse;
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generate = require("@babel/generator").default;

let fileData = `
function test2() {
    console.log('i am run')
}
`

function transform () {
    const ast = jsparse(fileData)
    const visitor = {
        CallExpression(path) {
            if (t.isMemberExpression(path.node.callee) && path.node.callee.object.name === 'console' && path.node.callee.property.name === 'log') {
                const parent = path.findParent((path2) => {
                    return t.isFunctionDeclaration(path2)
                })
                if (parent && parent.node.id.name) {
                    const strNode = t.stringLiteral(`${parent.node.id.name}=>`)
                    path.node.arguments.unshift(strNode)
                }
            }
        }
    }
    traverse(ast, visitor)
    return generate(ast).code
}

const code = transform()
console.log(code);