/**
 * ============================================================================
 * components/ui/switch.tsx — 开关切换组件（shadcn/ui）
 * ============================================================================
 *
 * Switch（开关）是一个开/关切换控件，功能等同于 checkbox，
 * 但外观更直观（像手机设置里的拨动开关）。
 *
 * 视觉状态：
 *   - 关闭（unchecked）：灰色轨道，小圆球在左侧
 *   - 开启（checked）：深黑色轨道，小圆球滑动到右侧
 *
 * 本项目中的使用场景：
 *   - ChatInterface 设置面板中的"Claude 长手模式（Computer Use）"开关
 *
 * 【使用示例】
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 * <Switch defaultChecked />   // 默认开启
 */
"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch@1.1.3";

import { cn } from "./utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-switch-background focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-card dark:data-[state=unchecked]:bg-card-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
