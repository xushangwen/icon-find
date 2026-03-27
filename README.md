# Icon 识别助手

使用 Gemini AI 识别图标特征，快速在 Flaticon 找到相似素材的智能工具。

## ✨ 功能特性

- 🎯 **AI 智能识别** - 使用 Gemini 1.5 Flash 分析图标，生成精准关键词
- 🌓 **亮暗模式** - 支持亮色/暗色主题切换，跟随系统设置
- 📤 **多种上传方式** - 拖拽、点击、粘贴三种方式上传图片
- 🔍 **一键搜索** - 直接跳转 Flaticon 搜索相似图标
- 🔐 **隐私安全** - API Key 和数据存储在本地浏览器
- 📱 **响应式设计** - 完美适配桌面、平板、手机

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 查看应用。

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 🔑 获取 Gemini API Key

1. 访问 [Google AI Studio](https://aistudio.google.com/app/apikey)
2. 登录 Google 账号
3. 创建新的 API Key
4. 在应用右上角设置中配置 API Key

## 🛠️ 技术栈

- **框架**: Vite 6 + React 19 + TypeScript
- **样式**: Tailwind CSS
- **组件**: Radix UI
- **状态管理**: Zustand
- **AI**: Google Generative AI (Gemini)
- **图标**: Remix Icon v4.9.1
- **动画**: Framer Motion

## 📁 项目结构

```
icon-find/
├── src/
│   ├── components/      # React 组件
│   ├── hooks/          # 自定义 Hooks
│   ├── store/          # Zustand 状态管理
│   ├── lib/            # 工具函数和 API
│   ├── types/          # TypeScript 类型定义
│   ├── App.tsx         # 主应用组件
│   └── main.tsx        # 入口文件
├── public/             # 静态资源
└── package.json
```

## 📝 使用说明

1. **设置 API Key**: 首次使用需在右上角设置中配置 Gemini API Key
2. **上传图标**: 拖拽、点击或粘贴图片到上传区域
3. **查看结果**: AI 自动分析并生成中英文关键词
4. **搜索图标**: 点击"在 Flaticon 查找"按钮跳转搜索

## 🎨 支持的图片格式

- PNG
- JPG/JPEG
- SVG
- WebP

最大文件大小: 5MB

## 📄 License

MIT

## 🙏 致谢

- [Gemini AI](https://ai.google.dev/) - AI 识别能力
- [Flaticon](https://www.flaticon.com/) - 图标资源库
- [Remix Icon](https://remixicon.com/) - 图标系统
