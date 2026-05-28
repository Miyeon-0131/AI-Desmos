/**
 * ============================================================================
 * components/ui/input.tsx — 通用文本输入框组件（shadcn/ui）
 * ============================================================================
 *
 * 对原生 <input> 元素的封装，添加了统一的 Tailwind 样式：
 *   - 圆角边框、浅灰背景（bg-input-background）
 *   - 聚焦时显示蓝色焦点环（focus-visible: 类）
 *   - 表单验证失败时显示红色边框（aria-invalid: 类）
 *   - 禁用状态变灰（disabled: 类）
 *   - 支持文件上传输入（type="file"）
 *   - 响应式字号：移动端 text-base（16px），桌面端 text-sm（14px）
 *
 * 【使用示例】
 * <Input type="text" placeholder="输入..." />
 * <Input type="password" value={value} onChange={handleChange} />
 */
import * as React from "react";

import { cn } from "./utils";

/**
 * Input — 文本输入框组件
 * @param className - 额外的自定义类名
 * @param type      - 输入框类型（text/password/email/number 等，对应 HTML input type）
 * @param ...props  - 其余所有原生 input 属性（value、onChange、placeholder 等）
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
