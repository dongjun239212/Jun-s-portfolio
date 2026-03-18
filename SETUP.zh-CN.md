# 本地环境配置与预览

## 前置要求

- **Node.js**：建议 **18.x 或更高**（当前常用 LTS 即可；你本机已可用 Node 22）
- **npm**：随 Node 自带即可（或可用 `pnpm` / `yarn` 替代对应命令）

## 一次性配置（克隆/拉代码后）

在项目根目录执行（路径含空格时请用引号）：

```bash
cd "/Users/bytedance/Desktop/Calm & Crazy design website/Jun-s-portfolio"
npm install
```

## 启动开发预览

```bash
npm run dev
```

若遇到端口占用或 `.next` 锁文件问题，可用项目自带脚本：

```bash
npm run dev:preview
```

## 预览地址（本地）

在浏览器打开：

**[http://localhost:3000](http://localhost:3000)**

（Next.js 默认端口为 `3000`；若终端里提示使用了其他端口，请以终端输出为准。）

## 生产构建本地预览（可选）

```bash
npm run preview
```

会先执行 `next build`，再静态预览构建结果（具体端口见脚本输出）。

## 环境变量（推荐）

- **`NEXT_PUBLIC_SITE_URL`**：正式域名，如 `https://yourname.com`（用于 metadata、Open Graph）。未设置时：Vercel 会用 `VERCEL_URL`，本地开发为 `http://localhost:3000`。
- 重新生成分享图：`npm run generate-og`（输出 `public/og.png`，可按需改 `scripts/generate-og.mjs` 后重跑）。

## 线上可分享链接（可选）

要把网站变成**公网可访问的链接**，可部署到 [Vercel](https://vercel.com)（与 Next.js 同团队），连接 Git 仓库后自动获得 `https://你的项目.vercel.app` 这类地址。
