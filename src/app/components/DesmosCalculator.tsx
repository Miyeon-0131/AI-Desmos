/**
 * ============================================================================
 * DesmosCalculator.tsx — Desmos 图形计算器封装组件
 * ============================================================================
 *
 * 【这个组件做什么？】
 * 把 Desmos（一个在线数学绘图工具）嵌入到我们的应用中。
 * Desmos 本身是一个第三方库，通过 <script> 标签动态加载。
 * 这个组件负责：
 *   1. 动态加载 Desmos 的 JavaScript 文件（脚本）
 *   2. 创建计算器实例并挂载到页面上
 *   3. 把计算器实例通过回调函数传给父组件（App.tsx），让父组件也能操控画板
 *   4. 监听加载状态（加载中 / 就绪 / 失败）并通知父组件
 *   5. 自动移除 Desmos 的试用版警告横幅
 *   6. 监听容器大小变化，自动触发计算器重新布局
 *
 * 【注意】
 * - 加载失败时的错误 UI 仅作为兜底；App.tsx 中有更美观的遮罩层
 * - API Key 使用 Desmos 官方 Demo Key，用于抑制"非商用"提示横幅
 */

// 导入 React 核心功能：
// React      — JSX 语法需要 React 在作用域内
// useEffect  — 用于处理"副作用"（如加载脚本、初始化计算器）
// useRef     — 用于持有不会触发重渲染的可变引用（如 DOM 元素、计算器实例）
// useState   — 用于管理会触发重渲染的状态（如加载状态）
import React, { useEffect, useRef, useState } from 'react';

// 从 lucide-react 图标库导入两个图标组件
// AlertCircle — 警告圆圈图标（用于错误状态显示）
// RefreshCcw  — 刷新箭头图标（用于"刷新重试"按钮）
import { AlertCircle, RefreshCcw } from 'lucide-react';

// ─── TypeScript 全局类型声明 ──────────────────────────────────────────────────

/**
 * 告诉 TypeScript：全局 window 对象上有一个 Desmos 属性。
 * 因为 Desmos 是通过 <script> 动态加载的，TypeScript 默认不知道它存在，
 * 不声明的话 window.Desmos 会报类型错误。
 * "any" 表示这个属性可以是任意类型（我们不深入定义 Desmos 的具体类型）。
 */
declare global {
  interface Window {
    Desmos: any; // Desmos 库挂载在全局 window 对象上
  }
}

// ─── 组件 Props 接口定义 ──────────────────────────────────────────────────────

/**
 * DesmosCalculatorProps — 这个组件接收的"参数"类型定义
 *
 * 在 React 中，父组件通过 "Props"（属性）向子组件传递数据。
 * interface 就是 TypeScript 中定义"数据形状"的方式。
 * 问号 ? 表示该属性是可选的，不传也不会报错。
 */
interface DesmosCalculatorProps {
  /** 外部传入的 CSS 类名，用于控制计算器区域的样式（宽高等） */
  className?: string;

  /** 计算器初始化完成后调用的回调函数，会把计算器实例传给父组件 */
  onCalculatorReady?: (calculator: any) => void;

  /** 加载状态变化时的回调函数：'loading'=加载中, 'ready'=就绪, 'error'=失败 */
  onStatusChange?: (status: 'loading' | 'ready' | 'error') => void;

  /** 传递给 Desmos 的额外配置选项（会合并到默认配置中） */
  options?: any;
}

// ─── 常量配置 ────────────────────────────────────────────────────────────────

/**
 * Desmos 官方 Demo API Key。
 * 使用这个 Key 可以抑制"非商用试用版"的警告横幅，
 * 让界面更整洁。这个 Key 是公开的 Demo Key，可以在开发中使用。
 */
const API_KEY = 'dcb31709b452b1cf9dc26972add0fda6';

/**
 * Desmos API 脚本的 URL（v1.11 版本）。
 * 我们用 模板字符串（反引号 `...`）动态插入 API_KEY。
 * ${API_KEY} 会被替换成上面定义的字符串。
 */
const SCRIPT_URL = `https://www.desmos.com/api/v1.11/calculator.js?apiKey=${API_KEY}`;

// ─── 组件主体 ────────────────────────────────────────────────────────────────

/**
 * DesmosCalculator 组件
 *
 * React.FC<DesmosCalculatorProps> 表示这是一个接收 DesmosCalculatorProps 类型参数的函数组件。
 * 使用解构赋值从 props 中取出各个属性，并为 className 设置默认值。
 */
export const DesmosCalculator: React.FC<DesmosCalculatorProps> = ({
  className = "w-full h-full", // 如果父组件没有传 className，默认铺满父容器
  onCalculatorReady,           // 计算器就绪回调（可能为 undefined）
  onStatusChange,              // 状态变化回调（可能为 undefined）
  options                      // 额外配置（可能为 undefined）
}) => {

  // ── useRef：持有不触发重渲染的引用 ──────────────────────────────────────

  /**
   * containerRef — 指向 Desmos 挂载的 DOM 元素（<div id="calculator">）
   * useRef<HTMLDivElement>(null) 创建一个初始值为 null 的引用。
   * 当 React 渲染后，会自动把 DOM 元素赋值给 containerRef.current。
   * Desmos 需要一个真实的 DOM 元素来初始化，所以需要这个引用。
   */
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * calculatorRef — 存储 Desmos 计算器实例。
   * 使用 useRef 而不是 useState，是因为：
   * 1. 计算器实例不需要触发组件重新渲染
   * 2. 在异步回调中访问时，useRef 总是能拿到最新值（useState 有闭包陷阱）
   */
  const calculatorRef = useRef<any>(null);

  /**
   * isMounted — 跟踪组件是否还挂载在页面上。
   * 异步操作（如加载脚本）完成时，组件可能已经被销毁了。
   * 检查 isMounted.current 可以防止"在已卸载组件上 setState"的 React 警告。
   */
  const isMounted = useRef(false);

  // ── useState：管理会触发界面更新的状态 ──────────────────────────────────

  /**
   * status — 当前的加载状态
   * 'loading' = 脚本加载中（初始状态）
   * 'ready'   = 计算器已初始化完成，可以使用
   * 'error'   = 加载失败（网络问题、脚本错误等）
   */
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  /**
   * errorDetails — 错误详情文本，加载失败时显示给用户
   */
  const [errorDetails, setErrorDetails] = useState<string>('');

  // ── useEffect：状态同步到父组件 ──────────────────────────────────────────

  /**
   * 每当 status 变化，就调用父组件传来的 onStatusChange 回调。
   * 问号 ?. 是可选链操作符：如果 onStatusChange 是 undefined，就跳过调用（不报错）。
   * 依赖数组 [status] 表示"只有当 status 变化时才重新执行这个 effect"。
   */
  useEffect(() => {
    onStatusChange?.(status); // 等价于：if (onStatusChange) onStatusChange(status);
  }, [status]); // 依赖 status，status 变化时重新执行

  // ── useEffect：核心初始化逻辑 ────────────────────────────────────────────

  /**
   * 这是整个组件最核心的 effect。
   * 依赖数组 [] 为空，表示"只在组件首次挂载时执行一次"。
   *
   * 执行流程：
   * 1. 标记组件已挂载（isMounted.current = true）
   * 2. 检查 Desmos 脚本是否已加载 → 已加载则直接初始化
   * 3. 未加载则创建 <script> 标签并插入页面 → 等待加载完成
   * 4. 每 100ms 检查一次 window.Desmos 是否可用（最多等 20 秒）
   * 5. 可用后初始化计算器，通知父组件
   * 6. 使用 ResizeObserver 监听容器大小变化，触发 resize()
   * 7. 返回"清理函数"：组件卸载时，销毁计算器、停止轮询
   */
  useEffect(() => {
    // 标记组件已挂载
    isMounted.current = true;

    // 保存轮询计时器的引用，用于之后清除它
    let checkInterval: NodeJS.Timeout;

    // ── 内部函数：初始化 Desmos 计算器 ─────────────────────────────────────
    /**
     * initCalculator — 创建 Desmos 计算器实例并挂载到 DOM
     *
     * 前置检查：
     * - isMounted.current：组件还在页面上
     * - containerRef.current：DOM 容器元素已就绪
     * - !calculatorRef.current：还没有初始化过（防止重复初始化）
     */
    const initCalculator = () => {
      // 三个条件都满足才执行
      if (!isMounted.current || !containerRef.current || calculatorRef.current) return;

      try {
        // 再次确认 Desmos 全局对象存在（防御性编程）
        if (!window.Desmos || !window.Desmos.GraphingCalculator) {
          throw new Error("Desmos object not found"); // 抛出错误，会被 catch 捕获
        }

        // ── 默认配置选项 ──────────────────────────────────────────────────
        // 这些选项控制计算器的外观和功能
        const defaultOptions = {
          autosize: true,        // 自动适应容器大小
          settingsMenu: true,    // 显示设置菜单（右上角的齿轮图标）
          zoomButtons: true,     // 显示缩放按钮（+/-）
          expressions: true,     // 显示表达式输入栏（左侧公式列表）
          border: false          // 不显示外边框（我们用自己的样式）
        };

        // 创建计算器实例
        // GraphingCalculator 接收两个参数：
        //   1. DOM 容器元素（挂载位置）
        //   2. 配置选项（用展开运算符 ... 合并默认配置和自定义配置）
        //      {...defaultOptions, ...options} 如果 options 有同名属性，会覆盖默认值
        const calculator = window.Desmos.GraphingCalculator(
          containerRef.current,
          { ...defaultOptions, ...options }
        );

        // 保存计算器实例到 ref，供之后操控
        calculatorRef.current = calculator;

        // 更新状态为"就绪"，触发界面重新渲染（隐藏加载遮罩）
        setStatus('ready');

        // ── 自动移除 Desmos 试用版警告横幅 ─────────────────────────────
        // MutationObserver 是浏览器 API，用于监听 DOM 变化。
        // Desmos 可能会在初始化后动态插入警告横幅，我们用 MutationObserver 拦截并删除。
        const observer = new MutationObserver(() => {
          // 查询页面中是否有 Desmos 的警告横幅元素
          const banner = document.querySelector('.dcg-api-warning-banner');
          if (banner) banner.remove(); // 找到就删除
        });

        // 开始监听 document.body 的子元素变化（包括深层子孙）
        observer.observe(document.body, { childList: true, subtree: true });

        // ── 通知父组件计算器已就绪 ────────────────────────────────────
        // 父组件（App.tsx）通过 onCalculatorReady 接收计算器实例，
        // 然后把它传给右侧的 ChatInterface 组件，让 AI 能操控画板
        if (onCalculatorReady) {
          onCalculatorReady(calculator);
        }

      } catch (err) {
        // 初始化失败时，记录错误并更新状态
        console.error("Desmos init failed:", err);
        if (isMounted.current) {
          setStatus('error');
          setErrorDetails(err.message); // 保存错误信息，显示给用户
        }
      }
    };

    // ── 内部函数：加载 Desmos 脚本 ──────────────────────────────────────────
    /**
     * loadScript — 负责动态加载 Desmos 的 JavaScript 文件
     *
     * 策略：
     * 1. 如果 window.Desmos 已存在 → 直接初始化（可能是页面之前已加载过）
     * 2. 如果页面中已有相同 src 的 <script> 标签 → 等待它加载（不重复添加）
     * 3. 否则，创建新的 <script> 标签并插入到 <head> 中
     * 4. 然后每 100ms 轮询检查 window.Desmos 是否可用
     */
    const loadScript = () => {
      // 情况 1：Desmos 已经在全局可用，直接初始化
      if (window.Desmos && window.Desmos.GraphingCalculator) {
        initCalculator();
        return; // 提前结束，不需要加载脚本
      }

      // 查找页面中是否已有相同 src 的 script 标签
      // document.querySelector 在整个 DOM 树中查找匹配选择器的第一个元素
      let script = document.querySelector(`script[src="${SCRIPT_URL}"]`) as HTMLScriptElement;

      if (!script) {
        // 情况 3：创建新的 <script> 标签
        script = document.createElement('script'); // 创建 DOM 元素
        script.src = SCRIPT_URL;  // 设置脚本 URL
        script.async = true;      // 异步加载（不阻塞页面渲染）

        // 脚本加载失败时的处理（如网络断开、URL 错误）
        script.onerror = (e) => {
          console.error("Desmos script load error:", e);
          if (isMounted.current) {
            setStatus('error');
            setErrorDetails(e.message);
          }
        };

        // 把 script 标签插入到 <head> 中，浏览器会开始下载脚本
        document.head.appendChild(script);
      }

      // ── 轮询等待 Desmos 可用 ───────────────────────────────────────────
      let attempts = 0;         // 已尝试次数
      const MAX_ATTEMPTS = 200; // 最大尝试次数（200 次 × 100ms = 20 秒超时）

      // setInterval 每隔指定毫秒数执行一次回调函数，返回一个"计时器 ID"
      checkInterval = setInterval(() => {
        if (window.Desmos && window.Desmos.GraphingCalculator) {
          // Desmos 已可用！清除轮询并初始化
          clearInterval(checkInterval); // 停止轮询（不再继续）
          initCalculator();
        } else {
          // 还不可用，计数 +1
          attempts++;
          if (attempts >= MAX_ATTEMPTS) {
            // 超时：等了 20 秒还没加载好，报错
            clearInterval(checkInterval);
            if (isMounted.current && !calculatorRef.current) {
              console.error("Desmos loading timed out");
              setStatus('error');
              setErrorDetails('Desmos loading timed out');
            }
          }
        }
      }, 100); // 每 100 毫秒检查一次
    };

    // ── 启动加载流程 ─────────────────────────────────────────────────────
    loadScript();

    // ── ResizeObserver：监听容器大小变化 ────────────────────────────────
    /**
     * ResizeObserver 是浏览器 API，专门用于监听元素尺寸变化。
     * 当聊天栏被拖拽调整宽度时，左侧 Desmos 容器也会变大/变小，
     * 我们需要告诉 Desmos "重新计算布局"，否则图形会错位。
     */
    const resizeObserver = new ResizeObserver(() => {
      // 每次容器大小变化都调用 resize()，让 Desmos 重新适配
      if (calculatorRef.current) {
        calculatorRef.current.resize();
      }
    });

    // 开始监听容器元素的大小变化
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // ── 清理函数（组件卸载时执行）──────────────────────────────────────
    /**
     * useEffect 可以返回一个"清理函数"。
     * 当组件被销毁（从页面移除）时，React 会自动调用这个函数。
     * 这里需要清理：停止轮询、销毁计算器、断开 ResizeObserver。
     * 不清理会导致"内存泄漏"（程序越跑越慢）。
     */
    return () => {
      isMounted.current = false; // 标记组件已卸载

      // 清除轮询计时器（如果还在轮询）
      if (checkInterval) clearInterval(checkInterval);

      // 销毁 Desmos 计算器实例，释放内存
      if (calculatorRef.current) {
        try { calculatorRef.current.destroy(); } catch (e) { /* 忽略销毁时的错误 */ }
        calculatorRef.current = null; // 清空引用
      }

      // 停止监听元素大小变化，释放资源
      resizeObserver.disconnect();
    };
  }, []); // 空依赖数组 = 只在组件挂载时执行一次

  // ─── JSX 渲染 ────────────────────────────────────────────────────────────

  /**
   * 返回组件的 UI 结构（JSX）。
   * JSX 是 JavaScript + HTML 的混合语法，最终会被编译成 React.createElement() 调用。
   *
   * 外层 div：相对定位容器（用于放置绝对定位的错误覆盖层）
   * 内层 div#calculator：Desmos 实际挂载的容器
   * 错误状态：加载失败时显示错误提示和重试按钮
   */
  return (
    <div className={`relative ${className}`}>
      {/* Desmos 计算器挂载容器
          ref={containerRef} 让 containerRef.current 指向这个 DOM 元素
          id="calculator" 是 Desmos API 常用的约定 ID  */}
      <div
        ref={containerRef}
        id="calculator"
        className="w-full h-full"
      />

      {/* 兜底错误提示层
          只有当 status === 'error' 时才渲染（条件渲染）
          App.tsx 中有更美观的错误遮罩，这个只作为备用 */}
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 z-10 p-6 text-center">
          {/* 警告图标 */}
          <AlertCircle className="w-10 h-10 text-red-500 mb-3" />

          {/* 错误标题 */}
          <h3 className="text-gray-900 font-bold mb-1">加载失败</h3>

          {/* 错误说明 */}
          <p className="text-gray-600 text-sm mb-2">无法加载 Desmos API 组件</p>

          {/* 如果有详细错误信息，显示出来（如超时、网络错误） */}
          {errorDetails && (
            <p className="text-gray-500 text-xs mb-3 max-w-md">{errorDetails}</p>
          )}

          {/* 排查建议列表 */}
          <div className="text-gray-600 text-xs mb-4 space-y-1">
            <p>- 请检查网络连接是否正常</p>
            <p>- 确认可以访问 www.desmos.com</p>
            <p>- 尝试关闭 VPN 或代理</p>
          </div>

          {/* 刷新重试按钮：点击后整页刷新 */}
          <button
            onClick={() => window.location.reload()} // 刷新整个页面
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors shadow-sm"
          >
            <RefreshCcw size={14} /> {/* 刷新图标 */}
            刷新重试
          </button>
        </div>
      )}
    </div>
  );
};
