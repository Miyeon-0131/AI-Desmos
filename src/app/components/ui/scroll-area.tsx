/**
 * ============================================================================
 * components/ui/scroll-area.tsx — 自定义滚动区域组件（shadcn/ui）
 * ============================================================================
 *
 * ScrollArea 替代原生滚动，提供跨平台一致的自定义滚动条样式。
 * 原生滚动条在不同操作系统上样式差异很大（Windows 宽而白，macOS 细而圆），
 * 用 Radix UI ScrollAreaPrimitive 可以统一成我们设计的样子。
 *
 * 导出的子组件：
 *   - ScrollArea — 滚动容器（包含视口和滚动条）
 *   - ScrollBar  — 滚动条本身（一般由 ScrollArea 自动渲染，不需要手动添加）
 *
 * 本项目中的使用场景：ChatInterface 右侧聊天消息列表区域
 *
 * 【使用示例】
 * <ScrollArea className="h-64">
 *   很长的内容...
 * </ScrollArea>
 */
"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area@1.2.3";

import { cn } from "./utils";

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
