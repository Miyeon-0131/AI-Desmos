/**
 * ============================================================================
 * components/ui/toggle-group.tsx — 切换按钮组组件（shadcn/ui）
 * ============================================================================
 *
 * ToggleGroup 是多个 Toggle 按钮的组合，支持单选或多选模式，
 * 就像工具栏里的"对齐方式"按钮组（左对齐/居中/右对齐只能选一个）。
 *
 * 内部使用 React.Context 把 variant 和 size 传递给所有子项，
 * 避免在每个 ToggleGroupItem 上重复写相同的 variant/size 属性。
 *
 * 导出的子组件：
 *   - ToggleGroup     — 按钮组容器（type="single" 单选 / type="multiple" 多选）
 *   - ToggleGroupItem — 单个切换按钮
 *
 * 本项目中不直接使用，作为通用组件预置。
 *
 * 【使用示例】
 * <ToggleGroup type="single" value={align} onValueChange={setAlign}>
 *   <ToggleGroupItem value="left"><AlignLeft /></ToggleGroupItem>
 *   <ToggleGroupItem value="center"><AlignCenter /></ToggleGroupItem>
 *   <ToggleGroupItem value="right"><AlignRight /></ToggleGroupItem>
 * </ToggleGroup>
 */
"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group@1.1.2";
import { type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";
import { toggleVariants } from "./toggle";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
});

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
