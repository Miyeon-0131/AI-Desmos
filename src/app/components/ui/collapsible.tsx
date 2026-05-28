/**
 * ============================================================================
 * components/ui/collapsible.tsx — 可折叠内容组件（shadcn/ui）
 * ============================================================================
 *
 * Collapsible（可折叠）是最简单的展开/折叠组件，
 * 与 Accordion 的区别：Collapsible 是单个独立的可折叠区域，不需要分组。
 *
 * 导出的子组件：
 *   - Collapsible        — 根容器（控制展开/折叠状态）
 *   - CollapsibleTrigger — 触发器（点击切换展开/折叠）
 *   - CollapsibleContent — 可折叠的内容区域（折叠时隐藏）
 *
 * 本项目中不直接使用，作为通用组件预置。
 *
 * 【使用示例】
 * <Collapsible open={isOpen} onOpenChange={setIsOpen}>
 *   <CollapsibleTrigger><Button>展开/折叠</Button></CollapsibleTrigger>
 *   <CollapsibleContent>折叠内容</CollapsibleContent>
 * </Collapsible>
 */
"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible@1.1.3";

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
