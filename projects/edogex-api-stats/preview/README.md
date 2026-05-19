# 浏览器预览说明

这个目录里的 `edogex-api-stats-preview.user.js` 是给 Tampermonkey 用的预览脚本。

使用方式：

1. 浏览器安装 Tampermonkey
2. 运行上一级的 `双击-生成浏览器预览脚本.cmd`
3. 在 Tampermonkey 里新建脚本，把 `edogex-api-stats-preview.user.js` 的内容粘进去并保存
4. 打开 `https://crs.edogex.com/admin-next/api-stats`
5. 以后每次修改 `inject.css` 或 `inject.js` 后，再运行一次生成脚本，把新内容覆盖到 Tampermonkey 里，刷新页面即可预览

说明：

- 这个预览方案主要用于页面样式和 DOM 逻辑调试
- `__TAURI__` 相关原生能力在普通浏览器里不可用，所以置顶等原生功能仍需要最终打包后验证
