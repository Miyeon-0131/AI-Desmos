# AI Desmos

> 用大语言模型驱动 Desmos 图形计算器：自然语言、图片、手绘与 Emoji 一键变成可交互的数学图形。

[![Website](https://img.shields.io/badge/Website-ai--desmos.online-blue)](https://ai-desmos.online)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)

**在线体验**：[https://ai-desmos.online](https://ai-desmos.online)  
**GitHub**：[Miyeon-0131/AI-Desmos](https://github.com/Miyeon-0131/AI-Desmos)

---

## 项目简介

**AI Desmos** 是一款纯前端的智能数学可视化 Web 应用。左侧是 [Desmos Graphing Calculator API](https://www.desmos.com/api) 画板，右侧是 AI 聊天栏。用户用中文或英文描述需求，AI 生成符合 Desmos 语法的表达式；系统通过 `<DESMOS>` 标签自动解析并注入画板，无需手动抄写公式。

除对话绘图外，应用还支持：

- **图片 / Emoji 智能绘图**：傅里叶级数拟合轮廓与填色，渐进式动画写入画板；
- **手绘转公式**：在坐标系上描边，笔迹 1:1 对齐后转为参数方程；
- **拍照解题**：OCR 识别题目，AI 流式解答并可选同步绘图；
- **画板分析与纠错**：读取当前表达式快照进行分析，或对报错公式一键 AI 修复。

AI 行为由开发者在代码内维护的系统提示词驱动（参考 [Desmos 官方帮助](https://help.desmos.com/hc/en-us) 与 [UinIO LaTeX 手册](http://www.uinio.com/Math/LaTex/)），聊天中的数学公式由 **KaTeX** 渲染，画板注入前会经语法层规范化（域条件、积分逗号等），以降低 Desmos 语法错误率。

API Key 保存在浏览器本地，对话直连所选 AI 服务商；未配置 Key 时可使用试用额度或邀请码解锁。

---

## 核心能力

| 能力 | 说明 |
| :--- | :--- |
| **自然语言绘图** | 描述函数、不等式填色、定积分阴影、参数方程、极坐标等，AI 输出 `<DESMOS>` 表达式 |
| **多模态输入** | 上传/粘贴图片、发送 Emoji、手绘路径、OCR 解题 |
| **智能绘图模式** | 轮廓 / 填色 / 二者兼有；大图逐条写入，点停止即出完整结果 |
| **AI 纠错** | 扫描画板语法错误，仅替换出错条目，不清空其他内容 |
| **多模型接入** | 20+ 服务商（DeepSeek、OpenAI、Claude、Gemini、Groq、通义、智谱等），Key 自动识别 |
| **双语界面** | 中文 / 英文 UI、引导页与用户指南 |
| **响应式布局** | 画板与聊天分栏，聊天栏宽度可拖拽，适配桌面与移动端 |

---

## 技术栈

| 类别 | 技术 |
| :--- | :--- |
| **框架** | React 18 · TypeScript · Vite 6 |
| **样式** | Tailwind CSS 4 · Radix UI · Motion |
| **图形** | Desmos Graphing Calculator API |
| **数学** | KaTeX（聊天 LaTeX）· 傅里叶路径拟合 · 多边形填色 |
| **AI** | OpenAI 兼容 API · Anthropic Messages · Google Gemini · OCR.space |
| **部署** | Vercel 静态托管（`vercel.json` + GitHub 自动部署） |
| **存储** | 浏览器 `localStorage`（配置、聊天记录） |

---

## 快速开始

### 环境要求

- Node.js ≥ 18
- 现代浏览器（Chrome / Edge / Firefox / Safari）
- 可选：任一 AI 服务商 API Key

### 本地运行

```bash
git clone https://github.com/Miyeon-0131/AI-Desmos.git
cd AI-Desmos
npm install
npm run dev
```

浏览器访问 **http://localhost:5173/**。首次打开进入引导页，可选择试用或填入 API Key。

### 生产构建

```bash
npm run build
npm run preview   # 本地预览 dist/
```

产物在 `dist/`，可部署至 Vercel、Netlify、GitHub Pages 等静态平台。

---

## 使用说明

### 对话绘图

在聊天栏输入例如：

```
画一个圆，半径用滑块控制
绘制 y = sin(x) 与 y = cos(x) 的交点
求 ∫₀¹ x² dx 并画出积分区域
```

AI 在回复中输出 `<DESMOS>...</DESMOS>`，系统自动写入左侧画板；说明文字中的公式用 `$...$` 显示。

### 图片 / 手绘 / Emoji

| 方式 | 操作 | 效果 |
| :--- | :--- | :--- |
| 图片 | 回形针上传或 `Ctrl+V` 粘贴 | 智能绘图（轮廓/填色）或 OCR 解题 |
| 手绘 | 左下角「手绘」 | 笔迹转 Desmos 参数曲线 |
| Emoji | 发送 `❤️` `🦋` 等 | 傅里叶拟合对应形状 |

绘图过程中可点 **停止**：跳过动画，立即显示完整图形。

### API Key

1. 点击聊天栏右上角 **设置**
2. 粘贴 API Key（自动识别服务商与推荐模型）
3. 保存后即可使用

### AI 智能纠错

表达式报错时，输入框旁出现 **AI 智能纠错**，点击后 AI 分析错误并生成修正公式，仅替换对应条目。

---

## 项目结构

```
AI Desmos/
├── index.html
├── vercel.json                 # Vercel 部署配置
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── app/
│   │   ├── App.tsx             # 根布局：Desmos 画板 + 聊天 + 手绘层
│   │   ├── components/
│   │   │   ├── ChatInterface.tsx      # 聊天、上传、设置、绘图进度
│   │   │   ├── ChatMessageContent.tsx # KaTeX 消息渲染
│   │   │   ├── DesmosCalculator.tsx   # Desmos API 封装
│   │   │   ├── Onboarding.tsx         # 引导与邀请码
│   │   │   └── UserGuideContent.tsx   # 用户指南
│   │   └── lib/
│   │       ├── deepseek.ts            # AI 调用、系统提示词（Desmos/LaTeX 规范）
│   │       ├── desmos-display.ts      # 公式规范化、标签解析
│   │       ├── chat-latex.ts          # 聊天 LaTeX 修正与提示词片段
│   │       ├── image-processing.ts    # 傅里叶拟合、渐进写入画板
│   │       ├── utils.ts               # Desmos 流式注入
│   │       ├── api-providers.ts       # 多服务商路由
│   │       └── i18n.ts                # 中英双语
│   └── styles/
└── dist/                       # npm run build 输出
```

---

## 架构要点

- **提示词**：`deepseek.ts` 内 `PROMPT_ZH` / `PROMPT_EN` 与 `DESMOS_OFFICIAL_SYNTAX_*`，约束 AI 一次输出正确 Desmos 语法。
- **注入层**：`utils.ts` + `desmos-display.ts` 解析 `<DESMOS>`、修正域条件 `\left\{...\right\}`、积分被积函数括号等。
- **渲染层**：`chat-latex.ts` + KaTeX 展示聊天公式，自动修正常见 LaTeX 笔误（下标、`\frac`、`, dx` 等）。
- **绘图动画**：`image-processing.ts` 中 `applyFourierExpressionsProgressively` 逐轮廓/逐 polygon 写入，停止时刷完剩余表达式。

---

## 贡献

1. Fork 本仓库  
2. 创建分支：`git checkout -b feature/your-feature`  
3. 提交：`git commit -m '描述你的改动'`  
4. 推送并发起 Pull Request  

---

## 开源协议

[MIT License](./LICENSE)

---

## 联系方式

- **作者**：灵俊宇  
- **邮箱**：[LingJunYu20081201@gmail.com](mailto:LingJunYu20081201@gmail.com)  
- **仓库**：[github.com/Miyeon-0131/AI-Desmos](https://github.com/Miyeon-0131/AI-Desmos)  
- **站点**：[ai-desmos.online](https://ai-desmos.online)

---

<p align="center">Made with ❤️ by 灵俊宇</p>
