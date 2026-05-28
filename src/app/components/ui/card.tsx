/**
 * ============================================================================
 * components/ui/card.tsx — 卡片容器组件（shadcn/ui）
 * ============================================================================
 *
 * Card（卡片）是一种常见的 UI 容器，用于把相关内容组织在一起，
 * 具有圆角、边框和背景色，视觉上像一张"卡片"。
 *
 * 导出的子组件（遵循"组合模式"）：
 *   - Card           — 外层容器（圆角边框，白色背景）
 *   - CardHeader     — 顶部区域（标题 + 可选操作按钮）
 *   - CardTitle      — 标题文字（h4 语义）
 *   - CardDescription — 描述文字（灰色次要文字）
 *   - CardAction     — 标题右侧的操作区域（如"设置"按钮）
 *   - CardContent    — 主要内容区域
 *   - CardFooter     — 底部区域（如确认/取消按钮）
 *
 * 【使用示例】
 * <Card>
 *   <CardHeader>
 *     <CardTitle>API 配置</CardTitle>
 *     <CardDescription>配置你的 API Key</CardDescription>
 *   </CardHeader>
 *   <CardContent>内容</CardContent>
 *   <CardFooter><Button>保存</Button></CardFooter>
 * </Card>
 */
import * as React from "react";

import { cn } from "./utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <h4
      data-slot="card-title"
      className={cn("leading-none", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 [&:last-child]:pb-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 pb-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
