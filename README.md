# 我的工具箱 🧰

精选好用的工具和资源导航站，涵盖 AI、开发、设计、效率、媒体、学习等多个领域。

## 功能特性

- 🔍 **搜索功能** - 支持关键词搜索工具（Ctrl+K 快捷键）
- 📂 **分类筛选** - 按类别快速筛选工具
- 🌙 **暗黑模式** - 支持亮色/暗色主题切换
- 📱 **响应式设计** - 完美适配手机、平板、电脑
- ⚡ **纯静态** - 无需服务器，可免费部署

## 快速开始

### 本地预览

直接用浏览器打开 `index.html` 即可预览。

### 部署到 GitHub Pages（免费）

1. **创建 GitHub 仓库**
   ```bash
   git init
   git add .
   git commit -m "init: 我的工具箱"
   ```

2. **推送到 GitHub**
   ```bash
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   git push -u origin main
   ```

3. **开启 GitHub Pages**
   - 进入仓库 → Settings → Pages
   - Source 选择 `main` 分支
   - 点击 Save
   - 等待 1-2 分钟，访问 `https://你的用户名.github.io/仓库名/`

### 部署到 Vercel（免费，更快）

1. 安装 Vercel CLI
   ```bash
   npm i -g vercel
   ```

2. 在项目目录运行
   ```bash
   vercel
   ```

3. 按提示操作，部署完成后会得到一个免费域名

## 自定义

### 添加新工具

在 `index.html` 的 `tools-grid` 中添加新的 `tool-card`：

```html
<div class="tool-card" data-category="ai">
  <a href="https://example.com" target="_blank" class="tool-link">
    <div class="tool-icon" style="background: linear-gradient(135deg, #颜色1, #颜色2)">
      <i class="bi bi-图标名"></i>
    </div>
    <div class="tool-info">
      <h3 class="tool-name">工具名称</h3>
      <p class="tool-desc">工具描述</p>
      <div class="tool-tags">
        <span class="tag">标签</span>
      </div>
    </div>
  </a>
</div>
```

### 修改分类

在 `index.html` 的 `category-tabs` 中添加新的分类按钮：

```html
<button class="tab-btn" data-category="new-category">
  <i class="bi bi-图标名"></i> 分类名称
</button>
```

### 修改配色

编辑 `style.css` 中的 CSS 变量：

```css
:root {
  --accent: #6366f1;      /* 主色调 */
  --accent-light: #818cf8; /* 主色调浅色 */
}
```

## 项目结构

```
my-toolbox/
├── index.html    # 主页面
├── style.css     # 样式文件
├── script.js     # 交互逻辑
└── README.md     # 说明文档
```

## 技术栈

- HTML5
- CSS3 (CSS Variables, Grid, Flexbox)
- Vanilla JavaScript
- Bootstrap Icons
- Google Fonts (Inter)

## License

MIT
