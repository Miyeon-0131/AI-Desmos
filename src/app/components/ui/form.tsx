/**
 * ============================================================================
 * components/ui/form.tsx — 表单组件（shadcn/ui + react-hook-form）
 * ============================================================================
 *
 * 这是 shadcn/ui 提供的表单系统，整合了 react-hook-form（表单状态管理库）
 * 与 Radix UI Label，提供：
 *   - 字段状态管理（touched/invalid/error）
 *   - 无障碍关联（Label 自动关联到输入框的 aria-describedby）
 *   - 统一的错误消息展示
 *
 * 导出的子组件：
 *   - Form           — FormProvider 的别名（包裹整个表单，注入 form 实例）
 *   - FormField      — Controller 封装（连接 react-hook-form 状态）
 *   - FormItem       — 单个字段的容器（垂直排列）
 *   - FormLabel      — 字段标签（validation 失败时自动变红）
 *   - FormControl    — 输入控件的 Slot（透传 id、aria-* 属性）
 *   - FormDescription — 字段说明文字（灰色小字）
 *   - FormMessage    — 错误提示文字（红色）
 *
 * 本项目中不直接使用（设置面板用的是简单的 input + label），
 * 作为通用组件预置。
 *
 * 【使用示例】
 * const form = useForm<FormValues>();
 * <Form {...form}>
 *   <form onSubmit={form.handleSubmit(onSubmit)}>
 *     <FormField control={form.control} name="email" render={({ field }) => (
 *       <FormItem>
 *         <FormLabel>邮箱</FormLabel>
 *         <FormControl><Input {...field} /></FormControl>
 *         <FormMessage />
 *       </FormItem>
 *     )} />
 *   </form>
 * </Form>
 */
"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label@2.1.2";
import { Slot } from "@radix-ui/react-slot@1.1.2"; // 用于透传 id 和 aria-* 属性
import {
  Controller,     // 把 react-hook-form 状态连接到受控输入框
  FormProvider,   // Context Provider，让表单内所有子组件能访问表单状态
  useFormContext, // 消费表单 Context 的 Hook
  useFormState,   // 获取表单状态（isDirty、isValid 等）
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form@7.55.0";

import { cn } from "./utils";
import { Label } from "./label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  );
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
