/**
 * ============================================================================
 * components/ui/separator.tsx — 分割线组件（shadcn/ui）
 * ============================================================================
 *
 * Separator（分割线）用于在视觉上区分不同内容区域。
 * 基于 Radix UI SeparatorPrimitive，提供两种方向：
 *   - horizontal（水平，默认）：一条贯穿容器宽度的细横线（高度 1px）
 *   - vertical（垂直）：一条贯穿容器高度的细竖线（宽度 1px）
 *
 * decorative=true（默认）：对屏幕阅读器隐藏（纯视觉装饰）
 * decorative=false：作为语义分割（屏幕阅读器会读"分隔符"）
 *
 * 【使用示例】
 * <Separator />                             // 水平分割线
 * <Separator orientation="vertical" />      // 垂直分割线（需要父容器设高度）
 */
"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator@1.1.2";

import { cn } from "./utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
