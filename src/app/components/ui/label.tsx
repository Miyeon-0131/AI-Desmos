/**
 * ============================================================================
 * components/ui/label.tsx — 表单标签组件（shadcn/ui）
 * ============================================================================
 *
 * Label 是 HTML <label> 元素的无障碍增强封装，基于 Radix UI LabelPrimitive。
 *
 * 核心功能：
 *   - 样式：小字号（text-sm）+ 中等字重（font-medium），与输入框配套使用
 *   - 无障碍：通过 htmlFor 或包裹输入框，关联 Label 和对应控件
 *     屏幕阅读器会读出标签文字，帮助视障用户理解表单字段含义
 *   - 禁用状态传播：当关联输入框 disabled 时，Label 也自动变灰
 *
 * 【使用示例】
 * <Label htmlFor="email">邮箱地址</Label>
 * <Input id="email" type="email" />
 */
"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label@2.1.2";

import { cn } from "./utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
