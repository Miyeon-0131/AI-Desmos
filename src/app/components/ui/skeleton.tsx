/**
 * ============================================================================
 * components/ui/skeleton.tsx — 骨架屏组件（shadcn/ui）
 * ============================================================================
 *
 * Skeleton（骨架屏）是内容加载时的占位动画，
 * 用灰色闪烁块代替实际内容，让用户感知"内容正在加载"，
 * 比旋转加载圈更自然（用户能预感到内容的形状和布局）。
 *
 * 实现原理：
 *   - bg-accent：灰色背景（用 CSS 变量 --accent）
 *   - animate-pulse：Tailwind 的脉冲动画（透明度在 1 和 0.5 之间周期变化）
 *   - rounded-md：圆角（让骨架块看起来更柔和）
 *
 * 本项目中不直接使用，但作为通用组件预置，以备将来加载状态的 UI 扩展。
 *
 * 【使用示例】
 * <Skeleton className="h-4 w-48" />       // 单行文字骨架
 * <Skeleton className="h-32 w-full" />    // 图片骨架
 * <Skeleton className="h-8 w-8 rounded-full" />  // 圆形头像骨架
 */
import { cn } from "./utils";
import * as React from "react";

/** Skeleton — 骨架屏占位块 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
