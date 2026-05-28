/**
 * postcss.config.mjs — PostCSS 配置文件
 *
 * 【PostCSS 是什么？】
 * PostCSS 是一个 CSS 处理工具，可以用插件转换 CSS 代码。
 * 例如：自动添加浏览器兼容前缀（-webkit-, -moz-）、压缩 CSS 等。
 *
 * 【为什么这个文件是空的？】
 * 本项目使用 Tailwind CSS v4，它通过 Vite 插件（@tailwindcss/vite）直接集成，
 * 不再需要通过 PostCSS 来处理 Tailwind。
 * 所以这个配置文件保留但为空（返回一个空对象）。
 *
 * 如果将来需要添加 PostCSS 插件（如 autoprefixer 自动补全浏览器前缀），
 * 可以在这里配置：
 * export default {
 *   plugins: {
 *     autoprefixer: {},
 *   }
 * }
 */

// Add any additional PostCSS configuration here
export default {}
