/**
 * ============================================================================
 * components/ui/hover-card.tsx — 悬停预览卡片组件（shadcn/ui）
 * ============================================================================
 *
 * HoverCard（悬停卡片）是鼠标悬停在元素上时显示的富内容预览卡片，
 * 比 Tooltip 更丰富——可以包含图片、链接、多行文字等复杂内容。
 * 常见于社交平台的"悬停看用户主页预览"等场景。
 *
 * 与 Tooltip 区别：
 *   - Tooltip：纯文字，小型气泡，信息辅助
 *   - HoverCard：可包含丰富内容，大型卡片，内容预览
 *
 * 导出的子组件：
 *   - HoverCard         — 根容器
 *   - HoverCardTrigger  — 触发元素（悬停此元素显示卡片）
 *   - HoverCardContent  — 卡片内容（64px 宽，带淡入动画）
 *
 * 本项目中不直接使用，作为通用组件预置。
 */
"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card@1.1.6";

import { cn } from "./utils";

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  );
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className,
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
