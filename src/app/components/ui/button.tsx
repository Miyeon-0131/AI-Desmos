import * as React from "react";

import { Slot } from "@radix-ui/react-slot@1.1.2";

import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:     "bg-primary text-primary-foreground hover:bg-primary/90",         // 默认：深黑背景+白字
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60", // 危险：红色
        outline:     "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",        // 描边：带边框+透明背景
        secondary:   "bg-secondary text-secondary-foreground hover:bg-secondary/80",   // 次要：浅灰背景
        ghost:       "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",  // 幽灵：无背景，悬停显示
        link:        "text-primary underline-offset-4 hover:underline",                // 链接：下划线样式
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",                  // 默认高度 36px，内边距适中
        sm:      "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",   // 小：高度 32px，圆角
        lg:      "h-10 rounded-md px-6 has-[>svg]:px-4",            // 大：高度 40px，更多内边距
        icon:    "size-9 rounded-md",                                // 图标按钮：正方形 36×36
      },
    },
    // 未传 variant 或 size 时的默认值
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/**
 * Button 组件
 *
 * @param className - 额外的自定义类名（会与变体类名智能合并）
 * @param variant   - 外观变体（default/destructive/outline/secondary/ghost/link）
 * @param size      - 尺寸（default/sm/lg/icon）
 * @param asChild   - 为 true 时，把样式嫁接到子元素（如 <a>），而不是渲染 <button>
 * @param ...props  - 其余所有原生 button 属性（onClick、disabled 等）
 */
function Button({
  className,
  variant,
  size,
  asChild = false, // 默认不使用 asChild 模式
  ...props         // 展开剩余属性（如 onClick、type、children 等）
}: React.ComponentProps<"button"> &         // 继承所有原生 button 属性
  VariantProps<typeof buttonVariants> & {   // 加上 variant 和 size 属性
    asChild?: boolean;                       // 加上 asChild 属性
  }) {
  // asChild=true → 用 Slot（把样式嫁接给子元素）
  // asChild=false → 用原生 <button> 元素
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"  // 供 CSS 选择器和 E2E 测试定位（data-slot 是 shadcn 的约定）
      // cn() 合并：buttonVariants 生成的类名 + 外部传入的自定义类名
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}          // 展开所有其他属性（onClick、disabled、children 等）
    />
  );
}

// 导出 Button 组件和 buttonVariants 函数
// buttonVariants 也导出，以便其他组件复用相同的按钮样式
export { Button, buttonVariants };
