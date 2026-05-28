/**
 * ============================================================================
 * components/ui/textarea.tsx — 多行文本输入组件（shadcn/ui）
 * ============================================================================
 *
 * 对原生 <textarea> 元素的封装，样式与 Input 组件保持一致：
 *   - resize-none：禁止用户手动拖拽调整大小（由 field-sizing-content 自动撑高）
 *   - field-sizing-content：内容自动撑高（CSS 新特性，内容越多越高）
 *   - min-h-16：最小高度 64px（约 3 行文字）
 *   - 聚焦焦点环、表单验证样式与 Input 相同
 *
 * 【使用示例】
 * <Textarea placeholder="输入多行内容..." />
 * <Textarea value={text} onChange={e => setText(e.target.value)} />
 */
import * as React from "react";

import { cn } from "./utils";

/**
 * Textarea — 多行文本输入框组件
 * @param className - 额外的自定义类名
 * @param ...props  - 其余所有原生 textarea 属性（value、onChange、rows 等）
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-input-background px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
