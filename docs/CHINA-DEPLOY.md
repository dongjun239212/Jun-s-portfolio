# 国内访问部署步骤（GitHub Pages）

项目已配置好：每次 push 到 `main` 后，GitHub Actions 会自动把站点部署到 GitHub Pages，生成**国内一般能直接打开**的链接。

---

## 你需要做的（一次性）

### 1. 在仓库里开启 GitHub Pages

1. 打开：**https://github.com/dongjun239212/My-new-portfolio**
2. 点顶部 **Settings**
3. 左侧菜单最下面找到 **Pages**
4. 在 **Build and deployment** 里：
   - **Source** 选 **GitHub Actions**（不要选 “Deploy from a branch”）
5. 不用再点别的，保存即可。

### 2. 把当前配置推上去，触发第一次部署

在本地项目目录执行：

```bash
cd "/Users/bytedance/Desktop/My personal website/my-portfolio"
git add .
git commit -m "Add GitHub Pages workflow for China access"
git push origin main
```

### 3. 等 Actions 跑完

1. 在 GitHub 仓库页点 **Actions**
2. 看到 **Deploy to GitHub Pages**  workflow，等它变绿（约 1～2 分钟）
3. 若失败，点进去看报错（常见是 Pages 未选 “GitHub Actions”）

### 4. 拿到国内可访问的链接

部署成功后，你的站点地址是：

**https://dongjun239212.github.io/My-new-portfolio/**

（注意末尾的 `/` 建议保留，分享时用这个完整链接即可。）

---

## 之后

- 你照常改代码、`git push origin main`，Actions 会自动重新构建并更新 GitHub Pages。
- **Vercel** 的链接（海外用）不变；**GitHub Pages** 的链接（国内用）固定为上面这个，可一起写在简历或介绍里。

---

## 两个链接分别给谁用

| 链接 | 适用 |
|------|------|
| https://my-new-portfolio-mocha.vercel.app | 海外或挂 VPN 时 |
| https://dongjun239212.github.io/My-new-portfolio/ | 国内直连 |

