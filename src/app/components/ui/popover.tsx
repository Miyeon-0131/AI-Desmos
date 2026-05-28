/**
 * ============================================================================
 * components/ui/popover.tsx — 气泡弹出层组件（shadcn/ui）
 * ============================================================================
 *
 * Popover（气泡弹出层）是点击触发器后弹出的浮动内容层，
 * 与 Tooltip 的区别：
 *   - Tooltip：鼠标悬停显示，纯展示，不可交互
 *   - Popover：点击显示，可以包含表单、按钮等可交互内容
 *
 * 常用于：点击按钮后弹出选项菜单、小型设置面板、颜色选择器等。
 *
 * 本项目中的使用场景：
 *   - ChatInterface 的"上传模式选择"菜单（点击回形针图标弹出）
 *   - "解题模式选择"弹出菜单
 *
 * 导出的子组件：
 *   - Popover         — 根容器（控制开关）
 *   - PopoverTrigger  — 触发器（点击打开气泡）
 *   - PopoverContent  — 气泡内容区域
 *   - PopoverAnchor   — 自定义锚点（高级用法）
 *
 * PopoverContent 参数：
 *   - align="center"（默认）：气泡与触发器对齐方式（start/center/end）
 *   - sideOffset=4：气泡与触发器的距离（像素）
 *
 * 【使用示例】
 * <Popover>
 *   <PopoverTrigger><Button>点击</Button></PopoverTrigger>
 *   <PopoverContent>气泡内容</PopoverContent>
 * </Popover>
 */
"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover@1.1.6";

import { cn } from "./utils";

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
