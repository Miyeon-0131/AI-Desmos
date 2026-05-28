/**
 * ============================================================================
 * components/ui/dialog.tsx — 模态对话框组件（shadcn/ui）
 * ============================================================================
 *
 * Dialog（对话框/模态框）是一个覆盖在页面上方的弹出层，
 * 用于需要用户专注操作的场景，如：确认操作、填写表单、查看详情。
 *
 * 基于 Radix UI DialogPrimitive，具备完整的无障碍支持：
 *   - 焦点陷阱：打开时焦点锁定在对话框内，不会跑到背后
 *   - ESC 关闭：按 ESC 键自动关闭
 *   - 背景滚动禁用：对话框打开时背景页面不可滚动
 *   - ARIA 属性：屏幕阅读器能正确识别对话框角色
 *
 * 导出的子组件：
 *   - Dialog         — 根容器（控制开关状态）
 *   - DialogTrigger  — 触发按钮（点击打开对话框）
 *   - DialogContent  — 对话框内容区域（包含遮罩层和内容容器）
 *   - DialogHeader   — 标题区域
 *   - DialogFooter   — 底部按钮区域
 *   - DialogTitle    — 对话框标题（语义化，屏幕阅读器必需）
 *   - DialogDescription — 描述文字
 *   - DialogClose    — 关闭按钮
 *   - DialogOverlay  — 半透明黑色遮罩层
 *   - DialogPortal   — 把对话框渲染到 document.body（防止 z-index 问题）
 *
 * 本项目中的使用场景：ChatInterface 中的"导出到 Desmos"对话框
 *
 * 【使用示例】
 * <Dialog>
 *   <DialogTrigger><Button>打开</Button></DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>标题</DialogTitle>
 *       <DialogDescription>描述</DialogDescription>
 *     </DialogHeader>
 *     内容...
 *     <DialogFooter><Button>确认</Button></DialogFooter>
 *   </DialogContent>
 * </Dialog>
 */
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog@1.1.6";
import { XIcon } from "lucide-react@0.487.0"; // X 图标（右上角关闭按钮）

import { cn } from "./utils";

/** Dialog — 根容器（内部管理 open/close 状态，或通过 open 属性外部控制） */
function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

/** DialogTrigger — 触发器（点击此元素打开对话框） */
function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

/** DialogPortal — 把对话框渲染到 body 下（跳出当前 DOM 树，避免 z-index 问题） */
function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

/** DialogClose — 关闭按钮（点击关闭对话框） */
function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

/**
 * DialogOverlay — 半透明黑色遮罩层
 * 点击遮罩层可以关闭对话框（Radix UI 默认行为）
 * 打开/关闭时有淡入淡出动画（animate-in/animate-out）
 */
function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        // 打开时淡入，关闭时淡出；fixed inset-0 铺满全屏；z-50 在最上层；bg-black/50 半透明黑色
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
