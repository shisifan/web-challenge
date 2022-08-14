# 【WIP】 web-challenge
本仓库主要是为了锻炼对于框架的理解以及编程能力
## 第一周
1. 思考回答如下代码从函数开始执行到页面上渲染 dom 大体上都经过了哪些步骤?（每一步的输入输出都是什么）
```ts
const App = () => {
  return (
    <div>Hello World!</div>
  )
}
```
> tip: babel jsx mount 等
2. 什么是 react 的状态？react为什么需要状态？
- 触发更新之后两次之间的状态是如何关联的

3. 为什么会出现例如 redux、mobx、recoil 等这一类数据管理库？他们分别解决了什么问题？

4. 尝试分别使用 redux、mobx、recoil 实现 todolist 然后对比差异