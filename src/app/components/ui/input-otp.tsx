/**
 * ============================================================================
 * components/ui/input-otp.tsx — 一次性密码输入框组件（shadcn/ui）
 * ============================================================================
 *
 * InputOTP（一次性密码输入框）是专为验证码场景设计的输入组件，
 * 每个数字显示在独立的方形框中，类似短信验证码输入界面。
 * 基于 input-otp 库。
 *
 * 特性：
 *   - 焦点自动跳转（输入一位后自动移到下一格）
 *   - 粘贴支持（粘贴6位验证码自动填充）
 *   - 可自定义分组（3+3 格式：123-456）
 *   - 支持纯数字/字母数字模式
 *
 * 导出的子组件：
 *   - InputOTP         — 根容器（管理所有输入格状态）
 *   - InputOTPGroup    — 输入格分组容器
 *   - InputOTPSlot     — 单个输入格（显示字符 + 光标动画）
 *   - InputOTPSeparator — 分组之间的分隔符（默认是 - 连字符）
 *
 * 本项目中不直接使用，作为通用组件预置。
 */
"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp@1.4.2"; // OTP 输入框核心逻辑
import { MinusIcon } from "lucide-react@0.487.0"; // 分隔符 (—) 图标

import { cn } from "./utils";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm bg-input-background transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
