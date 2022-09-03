const fs = require("fs");
const path = require("path");
const babylon = require("@babel/parser");
// Babel Traverse 模块维护整体的树状态，负责替换、移除和添加节点
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

let ID = 0;
// 读取文件信息，并获得当前 js 文件的依赖关系
function createAsset(filename) {
  // 获取文件，返回值是字符串
  const content = fs.readFileSync(filename, "utf-8");
  // 输出的content 为 ./originFile/entry.js 文件中的内容
  // import message from "./message.js";
  // console.log(message);

  // AST：可以把 js 文件里的代码抽象成一个对象，代码的信息会存在对象中
  // babylon 负责解析字符串并产生 AST
  // babylon.parse(code, [options])  parse() 将提供的 code 解析为完整的 ECMAScript 程序
  // [options]:
  // sourceType: 表明代码应该解析的模式
  // sourceFilename: 将输出的 AST 节点与其源文件名相关联。多用于多个输入文件的 AST 生成代码和 source map 时。
  // startLine: 默认情况下，解析的第一行代码被视为第 1 行。你可以提供一个行号来作为起始。多用于与其他源工具集成。
  // plugins: 数组，包含要启用的插件
  const ast = babylon.parse(content, {
    sourceType: "module",
  });
  // 输出的 AST 为：
  //   Node {
  //     type: 'File',
  //     start: 0,
  //     end: 59,
  //     loc: SourceLocation {
  //       start: Position { line: 1, column: 0, index: 0 },
  //       end: Position { line: 4, column: 0, index: 59 },
  //       filename: undefined,
  //       identifierName: undefined
  //     },
  //     errors: [],
  //     program: Node {
  //       type: 'Program',
  //       start: 0,
  //       end: 59,
  //       loc: SourceLocation {
  //         start: [Position],
  //         end: [Position],
  //         filename: undefined,
  //         identifierName: undefined
  //       },
  //       sourceType: 'module',
  //       interpreter: null,
  //       body: [ [Node], [Node] ],
  //       directives: []
  //     },
  //     comments: []
  //   }
  //   用来存储 文件所依赖的模块：当前 js 文件 import 了哪些文件，都会保存在这个数组里
  const dependencies = [];

  //   遍历当前AST
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      //   console.log(node);
      // 把当前依赖的模块加入到数组中，这个存储的是字符串
      // 例如 如果当前js文件 有一句 import message from './message.js'，
      // './message.js' === node.source.value
      dependencies.push(node.source.value);
    },
  });

  // 模块的ID 从 0 开始，相当于一个js文件，可以看成一个模块
  const id = ID++;

  // ES6 --> ES5
  const { code } = babel.transformFromAstSync(ast, null, {
    presets: ["@babel/preset-env"], // 支持被认为是 latest 的Babel所有插件
  });
  //   console.log(id, filename, dependencies, code);
  return {
    id,
    filename,
    dependencies,
    code,
  };
}

// 从入口开始分析所以依赖项，形成依赖图，采用广度遍历
function creatGraph(entry) {
  const mainAsset = createAsset(entry);
  // 广度遍历肯定要有一个队列，第一个元素肯定是 从 "./example/entry.js" 返回的信息
  const queue = [mainAsset];
  for (const asset of queue) {
    const dirname = path.dirname(asset.filename); // ./originFile
    // 新增一个属性来保存子依赖项的数据
    // 保存 数据结构 ---> {"./message.js": 1};
    asset.mapping = {}; // 映射
    asset.dependencies.forEach((relativePath) => {
      const absolutePath = path.join(dirname, relativePath);
      // 或得子依赖的依赖项、代码、模块id、文件名
      const child = createAsset(absolutePath);
      // 给子依赖项赋值
      asset.mapping[relativePath] = child.id;
      // 将子依赖也加入队列中，广度遍历
      queue.push(child);
    });
  }
  return queue;
}

// 根据生成的依赖关系图，生成浏览器可执行文件
function bundle(graph) {
  let modules = "";
  // 循环依赖关系，并把每个模块中的代码存在 function 作用域里
  graph.forEach((mod) => {
    modules += `${mod.id}:[
      function (require, module, exports){
        ${mod.code}
      },
      ${JSON.stringify(mod.mapping)},
    ],`;
  });

  // equire，module，exports 是 commonjs 的标准，不能在浏览器中直接使用，所以这里模拟模块加载，执行，导出操作
  const result = `
    (function(modules){
      //创建require函数， 它接受一个模块ID，可以在 modules 中找到对应是模块.
      function require(id){
        const [fn, mapping] = modules[id];
        function localRequire(relativePath){
          //根据模块的路径在mapping中找到对应的模块id
          return require(mapping[relativePath]);
        }
        const module = {exports:{}};
        //执行每个模块的代码。
        fn(localRequire,module,module.exports);
        return module.exports;
      }
      //执行入口文件，
      require(0);
    })({${modules}})
  `;
  return result;
}

const graph = creatGraph("./originFile/entry.js");
const ret = bundle(graph);
fs.writeFileSync("./dist/index.js", ret);
