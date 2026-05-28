/**
 * ============================================================================
 * components/ui/radio-group.tsx — 单选按钮组组件（shadcn/ui）
 * ============================================================================
 *
 * RadioGroup（单选按钮组）是一组互斥选项，每次只能选中一个。
 * 与 ToggleGroup type="single" 区别：
 *   - RadioGroup：表单语义，视觉上是圆形单选按钮
 *   - ToggleGroup：工具栏按钮语义，视觉上是方形按钮
 *
 * 视觉样式：
 *   - 未选中：圆形边框（无填充）
 *   - 已选中：边框内有小实心圆点（CircleIcon 填充）
 *
 * 本项目中不直接使用，作为通用组件预置。
 *
 * 【使用示例】
 * <RadioGroup value={provider} onValueChange={setProvider}>
 *   <RadioGroupItem value="deepseek" id="ds" /><Label htmlFor="ds">DeepSeek</Label>
 *   <RadioGroupItem value="openai" id="oai" /><Label htmlFor="oai">OpenAI</Label>
 * </RadioGroup>
 */
"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group@1.2.3";
import { CircleIcon } from "lucide-react@0.487.0"; // 选中状态的小实心圆点

import { cn } from "./utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
