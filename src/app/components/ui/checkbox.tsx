/**
 * ============================================================================
 * components/ui/checkbox.tsx — 复选框组件（shadcn/ui）
 * ============================================================================
 *
 * Checkbox（复选框）是可以被勾选/取消勾选的方形控件，
 * 与 Switch 相比更适合"同意条款"、"多选列表"等场景。
 *
 * 特性：
 *   - 未选中：白色边框方块（bg-input-background）
 *   - 已选中：深黑色背景 + 白色对勾图标（CheckIcon）
 *   - 焦点环（键盘导航支持）
 *   - 禁用状态（透明度降低）
 *
 * 【使用示例】
 * <Checkbox checked={agreed} onCheckedChange={setAgreed} />
 * <Checkbox id="agree" /><Label htmlFor="agree">我同意条款</Label>
 */
"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox@1.1.4";
import { CheckIcon } from "lucide-react@0.487.0"; // 对勾图标（选中状态显示）

import { cn } from "./utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border bg-input-background dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
