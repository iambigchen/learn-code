
import commonjs from '@rollup/plugin-commonjs'
// import babel from 'rollup-plugin-babel'

export default {
    input: 'index.js', // 指定入口文件
    output: {
        dir: 'dist', // 指定打包目录
        name: 'index', // 打包格式为iife和umd时，挂载在全局的名称
        format: 'esm' // 指定输出格式 其他格式有： amd、cjs、iife、esm、umd、system
    },
    plugins: [
        // babel({
        //     runtimeHelpers: true,
        //     exclude: 'node_modules/**'
        // }),
        commonjs()
    ]
}