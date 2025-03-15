# 永康交警应急护航系统

## 技术栈

- Vue 3 - 渐进式 JavaScript 框架
- TypeScript - JavaScript 的超集，添加了类型系统
- Ionic 7 - 跨平台移动应用开发框架
- Capacitor - 原生应用功能访问层

## 环境要求

- Node.js 16+
- npm 8+ 或 yarn 1.22+

## 开发环境搭建

1. 安装 Node.js
   ```bash
   # 从 Node.js 官网下载并安装: https://nodejs.org/
   # 验证安装
   node --version
   npm --version
   ```

2. 安装 Ionic CLI
   ```bash
   npm install -g @ionic/cli
   # 验证安装
   ionic --version
   ```

3. 安装项目依赖
   ```bash
   # 使用 npm 安装
   npm install
   # 或使用 yarn
   yarn install
   ```
4.安装相关语法高亮插件
    1.prettier ESLint
    2.TypeScript Vue Plugin(Volar)
    3.vue    ---Syntax Highlight for Vue.js
## 开发命令

### 开发服务器
```bash
# 启动开发服务器
npm run dev
# 或使用 ionic
ionic serve
```

### 构建命令
```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 测试命令
```bash
# 运行单元测试
npm run test:unit

# 运行端到端测试
npm run test:e2e
```

### 移动应用开发
```bash
# 添加 iOS 平台
ionic cap add ios

# 添加 Android 平台
ionic cap add android

# 同步最新构建到移动应用
ionic cap sync

# 在 IDE 中打开项目
ionic cap open ios    # 打开 Xcode
ionic cap open android    # 打开 Android Studio
```

## 项目结构
src/
├── assets/ # 静态资源文件
├── components/ # 通用组件
├── views/ # 页面组件
├── router/ # 路由配置
├── theme/ # 主题样式
└── App.vue # 根组件
## 开发规范

- 组件命名采用 PascalCase
- 文件命名采用 kebab-case
- CSS 类名采用 BEM 命名规范
- 提交信息格式：`type: description`
  - type: feat, fix, docs, style, refactor, test, chore

## 部署说明

1. 构建生产版本
   ```bash
   npm run build
   ```

2. 部署 dist 目录内容到服务器

## 常见问题

1. 如果遇到依赖安装问题，尝试删除 node_modules 后重新安装：
   ```bash
   rm -rf node_modules
   npm install
   ```

2. 开发服务器启动失败，检查端口占用：
   ```bash
   # Windows
   netstat -ano | findstr "8100"
   # Mac/Linux
   lsof -i :8100
   ```

## 版本历史

- v0.1.0 - 初始版本
  - 基础登录功能
  - 用户认证
  - 响应式布局

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

[MIT License](LICENSE)

## 联系方式

- 项目负责人：[姓名]
- 邮箱：[邮箱地址]