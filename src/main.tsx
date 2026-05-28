
/**
 * ============================================================================
 * main.tsx — React 应用入口文件
 * ============================================================================
 *
 * 【这个文件做什么？】
 * 这是整个 React 应用的"启动器"，只有寥寥几行，但非常重要：
 *   1. 引入根组件 App
 *   2. 引入全局样式
 *   3. 找到 HTML 中的 #root 容器，把 React 应用挂载进去
 *
 * 就像点火启动引擎：这里是引擎的点火装置，真正的引擎是 App.tsx。
 *
 * 【执行顺序】
 * 浏览器加载 index.html → 执行 <script src="/src/main.tsx"> → 
 * → 渲染 <App /> 到 <div id="root"> → 用户看到界面
 */

// createRoot：React 18 的现代渲染 API
// 用于创建一个"React 渲染根"，然后在根上调用 render() 把组件挂载到 DOM
import { createRoot } from "react-dom/client";

// 导入根组件 App（整个应用的顶层组件）
// .tsx 是 TypeScript + JSX 的文件扩展名
import App from "./app/App.tsx";

// 导入全局 CSS 样式（Tailwind CSS 基础样式 + 自定义全局样式）
// 这会影响整个页面的样式，如重置 margin/padding、字体等
import "./styles/index.css";

// 核心挂载代码：
// 1. document.getElementById("root") — 找到 index.html 中的 <div id="root">
// 2. ! 非空断言 — 告诉 TypeScript "这个元素一定存在，不会是 null"
//    （如果真的不存在，运行时会报错，但正常情况下 index.html 里一定有 #root）
// 3. createRoot() — 创建 React 渲染根（React 18 的新 API，支持并发特性）
// 4. .render(<App />) — 把 App 组件渲染到根元素里
//    <App /> 是 JSX 语法，等价于 React.createElement(App, null)
createRoot(document.getElementById("root")!).render(<App />);
