/**
 * ============================================================================
 * components/ui/tooltip.tsx — 悬浮提示组件（shadcn/ui）
 * ============================================================================
 *
 * Tooltip（工具提示）是鼠标悬停在元素上时显示的小型说明文字气泡。
 * 用于解释图标按钮等没有文字标签的控件功能。
 *
 * 导出的子组件：
 *   - TooltipProvider — 需要包裹在应用顶层（提供延迟显示的全局配置）
 *   - Tooltip         — 工具提示的根组件（包含 Provider，可独立使用）
 *   - TooltipTrigger  — 触发元素（鼠标悬停此元素时显示提示）
 *   - TooltipContent  — 提示内容气泡（支持方向：top/bottom/left/right）
 *
 * 本项目中的使用场景：
 *   - ChatInterface 顶部工具栏按钮：分析、导出、清空画板、设置、帮助图标按钮
 *
 * 默认延迟：delayDuration=0（立即显示，不需要等待）
 *
 * 【使用示例】
 * <Tooltip>
 *   <TooltipTrigger><Button size="icon"><Settings /></Button></TooltipTrigger>
 *   <TooltipContent>API 设置</TooltipContent>
 * </Tooltip>
 */
"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip@1.1.8";

import { cn } from "./utils";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
