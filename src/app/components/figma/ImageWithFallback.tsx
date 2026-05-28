import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

/**
 * ImageWithFallback 组件
 *
 * 接收与 <img> 完全相同的属性（React.ImgHTMLAttributes<HTMLImageElement>）。
 *
 * @param props - 所有标准 img 属性（src、alt、style、className 等）
 */
export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  // didError — 记录图片是否已加载失败
  // false（初始）= 正常显示 <img>
  // true = 显示占位图容器
  const [didError, setDidError] = useState(false)

  /**
   * handleError — 图片加载失败时的处理函数
   * 把 didError 设为 true，触发组件重新渲染，显示占位图
   */
  const handleError = () => {
    setDidError(true)
  }

  // 解构出常用属性，其余属性用 ...rest 打包传给占位图
  const { src, alt, style, className, ...rest } = props

  // 条件渲染：
  // 图片加载失败 → 显示带占位 SVG 的 div 容器
  // 图片正常     → 显示普通 <img>，并绑定 onError 监听失败事件
  return didError ? (
    // 占位图容器：灰色背景，居中显示占位 SVG
    // inline-block 保持与 <img> 相同的布局行为（行内块元素）
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      {/* 居中对齐容器 */}
      <div className="flex items-center justify-center w-full h-full">
        {/* 占位 SVG 图标
            data-original-url 存储原始图片 URL，方便调试时查看原本想加载什么图片 */}
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    // 正常图片：绑定 onError 事件处理器，加载失败时触发 handleError
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}
