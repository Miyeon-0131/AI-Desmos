# 🚀 AI Desmos

> 基于大语言模型与 Desmos 图形计算器 API 构建的智能数学绘图助手，让自然语言、图片与手绘笔迹一键转化为精确的可视化图形。

[![Website](https://img.shields.io/badge/Website-ai--desmos.online-blue)](https://ai-desmos.online)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)

---

## 🌟 特性 (Features)

* **自然语言绘图**：通过对话描述函数、几何图形或动画效果，AI 自动生成 Desmos 表达式并实时注入画板。
* **AI 智能纠错**：全画板扫描语法错误，一键修复表达式，支持中文标点自动纠正。
* **多模态输入**：支持上传图片、粘贴截图、输入 Emoji，以及手绘路径转参数方程（傅里叶拟合）。
* **多模型接入**：兼容 20+ 主流 AI 服务商（DeepSeek、OpenAI、Claude、Gemini、Groq 等），API Key 自动识别路由。
* **流式交互体验**：AI 回复逐字输出，Desmos 公式渐进式写入画板，任务可随时终止并保留当前进度。
* **中英双语界面**：完整 i18n 支持，引导页、设置面板与用户指南均可切换语言。
* **响应式布局**：Desmos 画板与 AI 聊天栏分栏展示，聊天栏宽度可拖拽调整，适配桌面与移动端。

## 📸 界面预览 (Screenshots)

> 在线体验：[https://ai-desmos.online](https://ai-desmos.online)

<!-- 将截图放入 docs/images/ 后取消下方注释即可展示 -->

<!--
| 主界面 | AI 对话绘图 |
| :---: | :---: |
| <img src="./docs/images/screenshot-main.png" width="400" alt="主界面"> | <img src="./docs/images/screenshot-chat.png" width="400" alt="AI 对话"> |
-->

## ⚙️ 环境依赖 (Prerequisites)

开始之前，请确保本地开发环境满足以下要求：

* [Node.js](https://nodejs.org) >= 18.0.0
* [Git](https://git-scm.com) >= 2.30.0
* 现代浏览器（Chrome / Edge / Firefox / Safari 最新版）
* 可选：任一 AI 服务商的 API Key（未配置时可使用试用额度）

> 本项目为纯前端应用，无需数据库或后端服务。API Key 保存在浏览器 `localStorage` 中，不会上传至第三方服务器。

## 🚀 快速开始 (Getting Started)

### 1. 克隆项目

```bash
git clone https://github.com/your-username/ai-desmos.git
cd ai-desmos
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

启动后在浏览器访问 **http://localhost:5173/** 即可查看效果。

首次打开会进入引导页，可选择试用模式或填入自定义 API Key。

### 4. 生产构建

```bash
npm run build
```

构建产物输出至 `dist/` 目录，可部署至任意静态托管平台（Vercel、Netlify、GitHub Pages 等）。

## 🛠️ 技术栈 (Tech Stack)

| 类别 | 技术 |
| :--- | :--- |
| **框架** | [React 18](https://react.dev) · [TypeScript](https://www.typescriptlang.org) · [Vite 6](https://vitejs.dev) |
| **样式** | [Tailwind CSS 4](https://tailwindcss.com) · [Radix UI](https://www.radix-ui.com) · [Motion](https://motion.dev) |
| **图形引擎** | [Desmos Graphing Calculator API](https://www.desmos.com/api) |
| **数学渲染** | [KaTeX](https://katex.org) · 傅里叶级数路径拟合 |
| **AI 接入** | OpenAI 兼容协议 · Anthropic Messages API · Google Gemini API |
| **状态存储** | 浏览器 `localStorage`（配置、聊天记录、训练数据） |

## 📖 使用指南 (Usage)

### 对话绘图

在右侧聊天栏输入自然语言描述，例如：

```
画一个心形曲线
绘制 y = sin(x) 和 y = cos(x) 的交点
做一个参数方程动画，t 从 0 到 2π
```

AI 会在回复中输出 `<DESMOS>` 标签内的表达式，系统自动解析并写入画板。

### 图片 / 手绘 / Emoji

| 输入方式 | 操作 | 效果 |
| :--- | :--- | :--- |
| 图片 | 点击回形针上传，或 `Ctrl+V` 粘贴 | 傅里叶拟合为参数曲线，或 OCR 识别后 AI 解题 |
| 手绘 | 点击左下角「手绘」按钮 | 笔迹 1:1 对齐坐标系，确认后转为 Desmos 表达式 |
| Emoji | 直接发送如 `🦋` `❤️` | 自动绘制对应形状 |

### API Key 配置

1. 点击聊天栏右上角 **设置** 图标
2. 粘贴 API Key（系统自动识别服务商）
3. 选择模型并保存

支持的厂商包括但不限于：DeepSeek、OpenAI、Anthropic Claude、Google Gemini、Groq、Moonshot、通义千问、智谱 AI、SiliconFlow 等。

### AI 智能纠错

当 Desmos 表达式出现语法错误时，输入框旁会出现 **AI 智能纠错** 按钮。点击后 AI 将分析错误并生成修正后的表达式，仅替换出错条目，不影响画板其他内容。

## 📁 项目结构 (Project Structure)

```
AI Desmos/
├── index.html              # 应用入口 HTML
├── vite.config.ts          # Vite 构建配置
├── src/
│   ├── main.tsx            # React 挂载入口
│   ├── app/
│   │   ├── App.tsx         # 根组件（画板 + 聊天栏布局）
│   │   ├── components/     # UI 组件（聊天、引导、Desmos 容器等）
│   │   └── lib/            # 核心逻辑（AI 调用、图像处理、国际化等）
│   ├── assets/             # 静态资源
│   └── styles/             # 全局样式
└── dist/                   # 生产构建输出（npm run build）
```

## 🤝 贡献指南 (Contributing)

欢迎任何形式的贡献！建议流程如下：

1. Fork 本项目
2. 创建特性分支（`git checkout -b feature/amazing-feature`）
3. 提交修改（`git commit -m 'Add some amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 提交 Pull Request

## 📄 开源协议 (License)

本项目采用 **MIT License** 开源。详见 [LICENSE](./LICENSE) 文件。

## 👥 联系方式 (Contact)

* **项目作者**：灵俊宇
* **电子邮箱**：[LingJunYu20081201@gmail.com](mailto:LingJunYu20081201@gmail.com)
* **在线体验**：[https://ai-desmos.online](https://ai-desmos.online)

---

<p align="center">Made with ❤️ by 灵俊宇</p>
