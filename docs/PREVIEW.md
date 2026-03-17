# 预览与部署

基于排查过的原因（无外网字体/图片依赖、静态导出可选、开发服务器锁与端口），按下面方式预览或部署即可。

## 方式一：开发服务器预览（推荐本地调试）

```bash
npm run dev:preview
```

- 会自动清除 `.next/dev/lock`，避免「另一实例在运行」导致卡住。
- 启动后在终端查看输出的地址，一般为 **http://localhost:3000**（若 3000 被占用会使用 3001）。
- 在浏览器打开该地址即可预览。

若 3000 端口已被占用，可先释放再启动：

```bash
# macOS / Linux
lsof -ti:3000 | xargs kill -9
npm run dev:preview
```

---

## 方式二：静态构建 + 本地预览（不依赖 Next 服务）

```bash
npm run preview
```

- 会先执行 `npm run build` 生成静态站点到 `out/`，再用静态服务器托管。
- 终端会提示访问地址，一般为 **http://localhost:3002**。
- 适合确认线上构建结果，或在不跑 Next 时快速看效果。

---

## 方式三：部署到 Vercel（公网可访问）

1. 登录 Vercel：
   ```bash
   npx vercel login
   ```

2. 在项目根目录部署：
   ```bash
   npx vercel --prod
   ```

3. 部署完成后终端会输出生产环境 URL（如 `https://my-portfolio-xxx.vercel.app`），即可用于公网预览。

当前项目已配置 `output: "export"`，构建产物为静态文件，Vercel 会自动识别并部署。

---

## 已排除的导致「一直加载」的原因

- 已移除 Google Fonts（Geist）依赖，避免字体请求阻塞首屏。
- 图片已改为本地资源（`public/`），无外网图床依赖。
- 使用 `dev:preview` 可避免多实例或 lock 文件导致开发服务器无法正常启动。

