/**
 * ============================================================================
 * components/ui/table.tsx — 数据表格组件（shadcn/ui）
 * ============================================================================
 *
 * 对原生 HTML 表格元素的样式封装，提供一套统一的、美观的表格样式。
 *
 * 导出的子组件（对应 HTML 表格结构）：
 *   - Table         → <table>（外层含水平滚动的容器 div）
 *   - TableHeader   → <thead>（表头区域）
 *   - TableBody     → <tbody>（数据行区域）
 *   - TableFooter   → <tfoot>（表尾区域，如汇总行）
 *   - TableRow      → <tr>（单行）
 *   - TableHead     → <th>（表头单元格，粗体左对齐）
 *   - TableCell     → <td>（数据单元格）
 *   - TableCaption  → <caption>（表格说明文字，显示在底部）
 *
 * 本项目中不直接使用，作为通用组件预置。
 *
 * 【使用示例】
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>姓名</TableHead>
 *       <TableHead>分数</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>张三</TableCell>
 *       <TableCell>95</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 */
"use client";

import * as React from "react";

import { cn } from "./utils";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
