type Partial2<T, K extends keyof T> = {
    [U in K]?: T[U]
} & Omit1<T, K>

type Person = {
    name: string
    age: number
}

type Man = Partial2<Person, 'name'>

const man: Man = {
    age: 1
}

type Required1<T> = {
    [P in keyof T]-?: T[P]
}

type Record1<K extends keyof any, T> = {
    [P in K]: T
}

type Omit1<T, K extends keyof T> = Pick1<T, Exclude1<keyof T, K>>

type WithOut<T, U> = {
    [p in Exclude<keyof T, keyof U>]?: never
}

type XOR<T, U> = (WithOut<T, U> & U) | (WithOut<U, T> & T);

type Pick1<T, P extends keyof T> = {
    [U in P]: T[U]
}

type Exclude1<T, U> = T extends U ? never : T;


type E = Exclude1<'a' | 'b' | 'c', 'b' | 'd'>


type Extract1<T, U> = T extends U ? T : never

type NonNullable1<T> = T extends null | undefined ? never : T

type Parameters1<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never

type ConstructorParameters1<T extends new (...args: any[]) => any> = T extends new (...args: infer P) => any ? P : never

type ReturnType1<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer P ? P : never

type InstanceType1<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer P ? P : never

type PromiseType1<T extends Promise<any>> = T extends Promise<infer P> ? P : never

type DeepReadonly1<T> = {
    readonly[U in keyof T]: T[U] extends Object ? DeepReadonly1<T[U]> : T[U]
}

type Readonly1<T> = {
    readonly[U in keyof T]: T[U]
}

type DR = DeepReadonly1<{
    a: string,
    b: {
        d: string
    }
}>

var dr: DR = {
    a: '1',
    b: {
        d: '2'
    }
}

type ConvertNumberToString<T> = {
    [K in keyof T]: T[K] extends number ? string : T[K]
}

type CN = ConvertNumberToString<{
    a: number
}>

var cn: CN = {
    a: '1'
}

type ValueOf<T> = T[keyof T]

type VO = ValueOf<{
    a: string,
    b: number
}>

type Mutable<T> = {
    -readonly[K in keyof T]: T[K]
}


// 枚举实现
// 常量枚举不会生成一下函数
// 常量枚举不支持动态计算、只支持静态引用
let EVA
(function (EVA) {
    EVA[EVA['a'] = 1] = 'a'
})(EVA = {})


// b 是某一个外部不知的动态值
const b = (window as any).a
// d 是一个静态值
const d = 111
enum EVar1 {
  A = 111,
  // 普通枚举支持完整的动态计算
  B = b * 2,
  C = d * 2
}

const enum EVar {
  E = 111,
  // ✓ 常量枚举支持静态引用（这一点和普通枚举相同）
  F1 = EVar1.A * 2,
  // × ↓ 不允许这种用法
  F2 = 2,
  // × ↓ 不允许这种用法
  F3 = 3,
}

interface A {
    name: string
    age: number
  }
  
  interface B {
    name: number
    id: string
  }
  
type Union = A | B; // A & B  name是never
const c: Union = {
    name: 1,
    age: 1,
    id: '1'
}


type Name = { name: string, a: string }
type Age = { age: number, a: number }

type Union1 = Name | Age

type UnionKey<P> = P extends infer P ? keyof P : never

type UK = UnionKey<Union1>

// ??
let x = foo ?? bar();
// 等价于
let x = foo !== null && foo !== undefined ? foo : bar();

// 类型别名可以为任何类型引入名称。例如基本类型，联合类型等
// 类型别名不支持继承
// 类型别名不会创建一个真正的名字
// 类型别名无法被实现(implements)，而接口可以被派生类实现
// 类型别名重名时编译器会抛出错误，接口重名时会产生合并


// unknown类型和any类型类似。与any类型不同的是。unknown类型可以接受任意类型赋值，但是unknown类型赋值给其他类型前，必须被断言

type TupleToUnion<T> = T extends Array<infer E> ? E : never

type UnionToIntersection<U> = (U extends U ?
    (arg: U) => any: never) extends (arg: infer T) => any
      ? T
      : never;

// 返回值类型是协变的，而参数类型是逆变的。