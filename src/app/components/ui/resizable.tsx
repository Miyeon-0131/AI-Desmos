/**
 * ============================================================================
 * components/ui/resizable.tsx — 可拖拽调整大小的面板组件（shadcn/ui）
 * ============================================================================
 *
 * 注意：这是 shadcn/ui 提供的 resizable 面板组件（基于 react-resizable-panels），
 * 与项目实际使用的 're-resizable' 库是不同的两个方案。
 *
 * 本项目（App.tsx）实际使用的是 re-resizable 库（Resizable 组件），
 * 这个文件是 shadcn/ui 预置的标准组件，暂未被项目直接使用。
 *
 * 两种方案的区别：
 *   - react-resizable-panels（这里）：基于弹性比例（百分比），适合复杂布局
 *   - re-resizable（App.tsx 用的）：基于固定像素，更简单直接
 *
 * 导出的子组件：
 *   - ResizablePanelGroup  — 包含多个面板的容器（定义方向：horizontal/vertical）
 *   - ResizablePanel       — 单个面板
 *   - ResizableHandle      — 两面板之间的拖拽把手（可选择是否显示抓手图标）
 *
 * 【使用示例】
 * <ResizablePanelGroup direction="horizontal">
 *   <ResizablePanel defaultSize={70}>左侧内容</ResizablePanel>
 *   <ResizableHandle withHandle />
 *   <ResizablePanel defaultSize={30}>右侧内容</ResizablePanel>
 * </ResizablePanelGroup>
 */
"use client";

import * as React from "react";
import { GripVerticalIcon } from "lucide-react@0.487.0"; // 拖拽把手的"竖线"图标
import * as ResizablePrimitive from "react-resizable-panels@2.1.7";

import { cn } from "./utils";

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className,
      )}
      {...props}
    />
  );
}

function ResizablePanel({
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
