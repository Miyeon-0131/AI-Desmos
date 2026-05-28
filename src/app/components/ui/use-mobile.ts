/**
 * ============================================================================
 * components/ui/use-mobile.ts — 检测移动端设备的 React Hook
 * ============================================================================
 *
 * 【这个 Hook 做什么？】
 * 提供一个 useIsMobile() 函数，让组件知道当前是否在手机端访问。
 *
 * 判断标准：屏幕宽度 < 768px 视为移动端。
 * （768px 是业界通用的"平板/手机"分界线，对应 Tailwind 的 md 断点）
 *
 * 【使用方法】
 * const isMobile = useIsMobile();
 * if (isMobile) {
 *   // 手机端特殊处理
 * }
 *
 * 【响应式：自动更新】
 * 使用 window.matchMedia 监听窗口大小变化，
 * 当用户拖动浏览器窗口导致宽度跨越 768px 时，返回值会自动更新。
 */

import * as React from "react";

// 移动端断点阈值（像素）
// 宽度 < 768px → 手机端
// 宽度 >= 768px → 桌面端/平板
const MOBILE_BREAKPOINT = 768;

/**
 * useIsMobile — 判断当前是否在移动端
 *
 * @returns boolean
 *   true  = 当前屏幕宽度 < 768px（手机端）
 *   false = 当前屏幕宽度 >= 768px（桌面端）
 */
export function useIsMobile() {
  // isMobile 初始值为 undefined（还没检测）
  // 确定后会变成 true 或 false
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    // window.matchMedia 创建一个媒体查询对象
    // `(max-width: 767px)` — 匹配宽度 <= 767px 的情况（MOBILE_BREAKPOINT - 1 = 767）
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // onChange：当屏幕宽度跨越断点时触发
    const onChange = () => {
      // window.innerWidth 获取当前视口宽度（不含浏览器边框）
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // 监听媒体查询状态变化（当宽度跨越 768px 时触发）
    mql.addEventListener("change", onChange);

    // 立即检测一次当前状态（初始化）
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // 清理函数：组件卸载时移除事件监听（防止内存泄漏）
    return () => mql.removeEventListener("change", onChange);
  }, []); // 空依赖数组 = 只在组件挂载时绑定一次

  // !! 双重取反：把 undefined | boolean 转换成纯 boolean
  // undefined → false（组件刚挂载时还没确定，默认当作桌面端）
  return !!isMobile;
}
