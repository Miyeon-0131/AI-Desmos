/**
 * ============================================================================
 * components/ui/accordion.tsx — 折叠面板组件（shadcn/ui）
 * ============================================================================
 *
 * Accordion（手风琴/折叠面板）是一组可以展开/折叠的内容区域，
 * 常用于 FAQ（常见问题）、帮助文档、设置分类等。
 *
 * 特性：
 *   - 点击标题展开/折叠内容
 *   - 动画：展开/折叠时有平滑的高度过渡动画
 *   - 支持单选（一次只能展开一个）或多选（type="multiple"）
 *   - 向下箭头图标随展开/折叠旋转 180°
 *
 * 导出的子组件：
 *   - Accordion        — 根容器
 *   - AccordionItem    — 单个折叠项（包含标题和内容）
 *   - AccordionTrigger — 可点击的标题（包含下箭头图标）
 *   - AccordionContent — 折叠的内容区域
 *
 * 本项目中的使用场景：ChatInterface 帮助面板（各功能说明的折叠区块）
 *
 * 【使用示例】
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>问题一</AccordionTrigger>
 *     <AccordionContent>答案一</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 */
"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion@1.2.3";
import { ChevronDownIcon } from "lucide-react@0.487.0"; // 折叠指示箭头

import { cn } from "./utils";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
