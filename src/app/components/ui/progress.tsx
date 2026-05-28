/**
 * ============================================================================
 * components/ui/progress.tsx — 进度条组件（shadcn/ui）
 * ============================================================================
 *
 * Progress（进度条）用于显示任务的完成百分比，如文件上传、步骤完成进度等。
 *
 * 实现原理：
 *   - 外层轨道（ProgressPrimitive.Root）：浅色圆形轨道
 *   - 内层填充条（ProgressPrimitive.Indicator）：用 translateX 实现百分比效果
 *     translateX(-${100 - value}%) — value=0 时完全移到左侧（不可见），
 *                                    value=100 时完全移到右侧（铺满）
 *   - transition-all：值变化时有平滑过渡动画
 *
 * 本项目中不直接使用（进度条改用 Onboarding 组件中的自定义 div 实现），
 * 作为通用组件预置。
 *
 * 【使用示例】
 * <Progress value={33} />     // 33% 进度
 * <Progress value={100} />    // 完成（100%）
 */
"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress@1.1.2";

import { cn } from "./utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
