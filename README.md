# 聊天室

XLab 全栈项目，使用NextJS重写了[cyrus28214/chat-room](https://github.com/cyrus28214/chat-room)
在线预览[https://chat-room-t3-yhyu.vercel.app/](https://chat-room-t3-yhyu.vercel.app/)

## 技术栈

- 基于 NextJS + TypeScript 搭建
- 使用 Tailwindcss + DaisyUI 进行样式设计
- 使用 React Query 实现数据请求和缓存
- 后端部分使用 tRPC + Prisma ORM 构建完整的类型安全API

## 项目特点

- 支持白天和黑夜模式切换
- 点击按钮后有友好的模态框提示信息
- 为图标按钮添加了Tooltip提示信息
- 使用 `localStorage` 缓存了用户信息，刷新页面后依然可以保持状态
- 完善的类型标注，充分利用了 TypeScript 的强大功能，几乎没有`any`。

## 效果展示

![](./images/preview1.png)

![](./images/preview2.png)

![](./images/preview3.png)
