# 【WIP】 web-challenge

本仓库主要是为了锻炼对于框架的理解以及编程能力

## 第一周 框架

1. 思考回答如下代码从函数开始执行到页面上渲染 dom 大体上都经过了哪些步骤?（每一步的输入输出都是什么）

```ts
const App = () => {
  return <div>Hello World!</div>;
};
```

2. 什么是 react 的状态？react为什么需要状态？

> tip: babel jsx mount 等

- 触发更新之后两次之间的状态是如何关联的

3. 为什么会出现例如 redux、mobx、recoil 等这一类数据管理库？他们分别解决了什么问题？

4. 尝试分别使用 redux、mobx、recoil 实现 todolist 然后对比差异

## 第二周 模块化

1. 什么是编程语言中的模块化？为什么需要模块化？

2. JavaScript 最初被作为脚本语言发布，模块化是如何一步步走到现在的？

3. webpack 为什么能一直走到现在? 它有什么优点？它提供什么样的能力？

4. 尝试在项目中开启 webpack 的绝大部分能力并通过编译

5. parcel Rollup Esbuild SWC Vite Snowpack Webpack 相关工具的定位什么是？它们之间的关系是什么？

6. 尝试自己实现一个简易的 webpack (可以参考教程)

7. 社区中现在会有 Esbuild 和 SWC 串行编译的方案，为什么要这么做？Esbuild 和 SWC 各有哪些优缺点？
