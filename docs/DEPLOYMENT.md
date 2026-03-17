# 对外上线清单

把本站从本地项目变成真实可访问的网站，按下面顺序做即可。

---

## 一、内容与信息（必做）

- [ ] **替换占位文案**
  - 首页：Hero 文案、KEY PROJECTS 标题与描述、DESIGN THINKING 卡片标题、About me、联系方式等
  - 详情页：项目标题（目前来自 URL `?title=`）、各 section 的正文、附录链接等
- [ ] **替换为真实图片**
  - 首页：`src/assets/` 下的 hero、key-project-1~4、thinking 等
  - 详情页：`src/assets/detail/` 下的占位图（可保留风格，换成真实项目截图/示意图）
- [ ] **个人/品牌信息**
  - `layout.tsx` 中的 `metadata.title`、`metadata.description` 改成你的名字与一句话介绍
  - 页脚 quote、About me、联系方式改为真实内容

---

## 二、SEO 与基础元数据（建议）

已在项目中做的配置：

- **基础 metadata**：`title`、`description`（在 `src/app/layout.tsx`）
- **Open Graph / Twitter**：便于社交分享时的标题、描述、图片（见下方「已加上的配置」）
- **robots.txt**：允许爬虫抓取（`public/robots.txt`）
- **语言**：`<html lang="en">` 已设置，若主要面向中文可改为 `lang="zh-CN"`

你可补充：

- [ ] 在 `metadata` 里加上 `keywords`（可选）
- [ ] 准备一张 **OG 分享图**（建议 1200×630），放到 `public/og.png`（已在 layout 的 `openGraph.images` 中引用，放图即可生效）
- [ ] 上线后做一次 [Google Search Console](https://search.google.com/search-console) 提交

---

## 三、域名与托管（必做）

**可正常打开的分享链接**：详见项目根目录 **`访问说明.md`**。当前推荐用 **GitHub Pages** 或 **Vercel** 链接分享；若使用阿里云 OSS 默认域名会出现「下载 index.html / 白屏」，需绑定已备案的自定义域名后才能正常打开网页。

1. **选托管方式（任选其一）**
   - **Vercel**：连 GitHub 仓库自动部署，免费额度够用，推荐
   - **Netlify**：同样支持 Git 自动部署，免费
   - **GitHub Pages**：免费，需用 `output: "export"` 的 `out` 目录部署（本项目已配置自动部署）
   - 其他：任何能托管静态文件的 CDN/服务器（把 `npm run build` 后的 `out` 目录上传即可）

2. **部署步骤概要**
   - 将项目推到 **GitHub**（或 GitLab 等）
   - 在 Vercel/Netlify 中「Import project」→ 选仓库 → 构建命令：`npm run build`，输出目录：`out`
   - 保存后每次 push 会自动重新部署

3. **自定义域名（可选）**
   - 在域名服务商处买域名（如 Namecheap、阿里云、Cloudflare 等）
   - 在 Vercel/Netlify 的 Project Settings → Domains 里添加域名，按提示解析（CNAME 或 A 记录）
   - 托管方一般会自动配好 HTTPS

---

## 四、上线前自检

- [ ] 本地执行 `npm run build` 无报错
- [ ] 本地用 `npm run preview`（或 `npx serve out -s`）打开 `out`，逐页点击：首页、详情、侧栏、Back to homepage、CALM & CRAZY 等，确认无 404、错链、样式错乱
- [ ] 用浏览器无痕/另一设备看一遍，确认无敏感或占位文案未改
- [ ] 若使用分析或第三方脚本，检查隐私说明（见下）

---

## 五、可选增强

- **分析统计**：接入 Google Analytics / Plausible / Umami 等（需在页面里加脚本或组件），并确保有隐私说明或 Cookie 提示（若面向欧盟用户需注意合规）
- **性能**：当前为静态导出 + 未压缩图片；若后续图片很多，可考虑 CDN 或图床 + 懒加载
- **反馈/联系**：页脚或 About 里可加邮箱、LinkedIn、Dribbble 等真实链接（若目前是占位，记得替换）

---

## 六、项目内已加上的配置说明

- **layout 元数据**：`src/app/layout.tsx` 已配置 `title`、`description`、`keywords`、Open Graph、Twitter Card、`robots`。上线后在托管平台设置环境变量 `NEXT_PUBLIC_SITE_URL=https://你的域名`，社交分享与 SEO 会使用该地址。
- **robots.txt**：`public/robots.txt` 已添加，允许所有爬虫；若有 sitemap 可在该文件内填写地址。
- **favicon**：在 `src/app/` 下放置 `icon.png`（或 `favicon.ico`），Next.js 会自动作为站标；不放则使用浏览器默认图标。
- **.env.example**：已添加，说明可选环境变量 `NEXT_PUBLIC_SITE_URL`；在 Vercel/Netlify 的 Project Settings → Environment Variables 中配置即可。

完成「一、内容与信息」和「三、域名与托管」后，站点即可对外访问；其余项按需逐步补全即可。

