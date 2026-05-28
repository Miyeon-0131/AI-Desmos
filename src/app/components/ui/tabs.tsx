/**
 * ============================================================================
 * components/ui/tabs.tsx — 选项卡组件（shadcn/ui）
 * ============================================================================
 *
 * Tabs（选项卡）用于在同一区域内切换不同的内容面板，
 * 常见于"设置"界面的多个分类页签。
 *
 * 导出的子组件：
 *   - Tabs        — 根组件（控制哪个 tab 处于激活状态）
 *   - TabsList    — 选项卡按钮栏（包含所有 TabsTrigger）
 *   - TabsTrigger — 单个选项卡按钮（点击切换内容）
 *   - TabsContent — 对应 TabsTrigger 的内容区域（只有激活的 tab 显示内容）
 *
 * 本项目中的使用场景：ChatInterface 设置面板（各 API 服务商的配置页签）
 *
 * 【使用示例】
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">标签一</TabsTrigger>
 *     <TabsTrigger value="tab2">标签二</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">内容一</TabsContent>
 *   <TabsContent value="tab2">内容二</TabsContent>
 * </Tabs>
 */
"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs@1.1.3";

import { cn } from "./utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px] flex",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-card dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
