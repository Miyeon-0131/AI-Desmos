/**
 * ============================================================================
 * components/ui/toggle.tsx — 切换按钮组件（shadcn/ui）
 * ============================================================================
 *
 * Toggle（切换按钮）是一个有两种状态（按下/未按下）的按钮，
 * 与 Switch 类似，但外观是按钮形状而非滑动开关。
 * 常用于工具栏（如文本编辑器的加粗/斜体按钮）。
 *
 * 状态：
 *   - 未激活（off）：透明背景，悬停时浅灰
 *   - 已激活（on）：深灰色背景（data-[state=on]:bg-accent）
 *
 * 变体（variant）：
 *   - default：无边框背景
 *   - outline：有边框
 *
 * 尺寸（size）：default / sm / lg
 *
 * 本项目中不直接使用，作为通用组件预置（ToggleGroup 的基础）。
 */
"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
