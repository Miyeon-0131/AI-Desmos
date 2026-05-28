/**
 * ============================================================================
 * components/ui/utils.ts — UI 组件工具函数
 * ============================================================================
 *
 * 这个文件只导出一个函数 cn()，但它是整个 shadcn/ui 组件库的基础工具。
 * 几乎每个 UI 组件都会用到它。
 *
 * 【什么是 cn()？】
 * cn = className（类名的缩写，读作 "class name"）
 * 这是一个"类名合并函数"，用来智能地合并 Tailwind CSS 类名。
 *
 * 【为什么需要这个函数？】
 * 直接拼接类名字符串会有问题：
 *   `${defaultClass} ${customClass}` 可能导致重复或冲突的类名
 *   例如：'bg-red-500' 和 'bg-blue-500' 同时存在时，哪个生效？
 *
 * cn() 能智能解决冲突：
 *   cn('bg-red-500', 'bg-blue-500') → 'bg-blue-500'（后面的覆盖前面的）
 *
 * 【使用的两个库】
 * - clsx：处理条件类名（true/false 决定是否包含某个类）
 * - tailwind-merge（twMerge）：解决 Tailwind 类名冲突
 */

// clsx：条件类名库
// 支持多种语法：字符串、数组、对象（{ className: condition }）
// 例如：clsx('a', { 'b': true, 'c': false }, 'd') → 'a b d'
import { clsx, type ClassValue } from "clsx";

// twMerge（tailwind-merge）：Tailwind 类名冲突解决库
// 智能识别 Tailwind 类名并去除冲突（如两个 bg-* 类，只保留最后一个）
import { twMerge } from "tailwind-merge";

/**
 * cn — CSS 类名合并工具函数
 *
 * 使用方法：
 *   cn('text-red-500', isLarge && 'text-lg', customClass)
 *   → 根据条件合并所有有效的类名，并解决 Tailwind 冲突
 *
 * @param inputs - 任意数量的类名（字符串、对象、数组、falsy值都可以）
 * @returns 合并后的类名字符串
 */
export function cn(...inputs: ClassValue[]) {
  // 先用 clsx 处理条件类名（去掉 false/null/undefined）
  // 再用 twMerge 解决 Tailwind 类名冲突
  return twMerge(clsx(inputs));
}
