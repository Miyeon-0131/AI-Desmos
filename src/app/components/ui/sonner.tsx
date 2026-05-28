/**
 * ============================================================================
 * components/ui/sonner.tsx — Toast 通知组件（shadcn/ui + sonner）
 * ============================================================================
 *
 * 这是 Sonner（一个流行的 Toast 通知库）的 shadcn/ui 封装版本。
 *
 * 【什么是 Toast 通知？】
 * Toast（吐司通知）是短暂显示在页面角落的轻量级通知，
 * 不需要用户交互就会自动消失，适合展示操作结果（如"保存成功"、"复制失败"）。
 *
 * 本项目中的使用方式：
 * - App.tsx 中放一个 <Toaster /> 组件（渲染通知容器）
 * - 在任何地方调用 toast('消息') 就会弹出通知
 * - 例如：toast.success('API Key 已保存')、toast.error('余额不足')
 *
 * 这个文件的作用：把 Sonner 的 Toaster 与项目的颜色主题对接，
 * 让通知的颜色（背景、文字、边框）使用 CSS 变量（--popover、--border 等），
 * 而不是 Sonner 的默认颜色，保持视觉统一。
 *
 * 注意：与真正的 App.tsx 中使用的 Toaster 不同，
 * App.tsx 直接从 sonner 导入 Toaster（带 position="top-center" 等配置），
 * 这个文件提供的是一个更标准化的封装版本，供其他地方使用。
 */
"use client";

// useTheme：读取当前主题模式（light/dark/system）
// 让 Toaster 的外观自动跟随应用的主题切换
import { useTheme } from "next-themes@0.4.6";

// Sonner：实际的 Toast 通知库
// Toaster  — 渲染通知容器的组件（放在应用顶层）
// ToasterProps — Toaster 接受的所有属性类型定义
import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
