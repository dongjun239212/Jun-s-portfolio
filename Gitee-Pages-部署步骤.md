# Gitee Pages 部署步骤（国内访问加速）

按下面做即可把站点部署到 Gitee，用 `https://你的用户名.gitee.io/my-portfolio/` 访问，国内直连通常比 GitHub Pages 快。

---

## 第一步：在 Gitee 建仓库

1. 打开 https://gitee.com 并登录（没有就注册）。
2. 右上角 **「+」→ 新建仓库**。
3. 仓库名填 **`my-portfolio`**（若改成别的名字，后面构建时要用 `GITEE_REPO_NAME=你的仓库名 npm run build:gitee`）。
4. 可见性选 **公开**，**不要**勾选「使用 Readme 文件初始化仓库」。
5. 创建仓库。

---

## 第二步：本地构建（已帮你跑过一遍）

在项目目录执行：

```bash
cd "/Users/bytedance/Desktop/My personal website/my-portfolio"
npm run build:gitee
```

会生成带路径前缀 `/my-portfolio` 的 **`out`** 目录，专门给 Gitee Pages 用。

若你的 Gitee 仓库名不是 `my-portfolio`，请先设环境变量再构建，例如：

```bash
GITEE_REPO_NAME=你的仓库名 npm run build:gitee
```

---

## 第三步：把 out 里的内容推到 Gitee

任选一种方式。

### 方式 A：用 Git 推（推荐）

在**新文件夹**里操作（不要在本项目根目录直接改）：

```bash
# 1. 克隆你在 Gitee 上建的**空**仓库
git clone https://gitee.com/你的用户名/my-portfolio.git gitee-pages
cd gitee-pages

# 2. 把本地已构建好的 out 目录里的内容，全部拷进当前目录
cp -r "/Users/bytedance/Desktop/My personal website/my-portfolio/out/"* .

# 3. 提交并推送
git add -A
git commit -m "deploy: Gitee Pages"
git push -u origin master
```

如果 Gitee 默认分支是 `main`，最后一行改成：`git push -u origin main`。

### 方式 B：在网页上传

1. 打开你的 Gitee 仓库页面，进入 **「上传文件」**。
2. 把本机 **`out`** 目录里的**所有文件和文件夹**（如 `index.html`、`_next`、`detail`、`404.html` 等）拖进去上传。
3. 提交。

---

## 第四步：开启 Gitee Pages

1. 打开该仓库的 **「服务」→「Gitee Pages」**。
2. 点击 **「启动」**（若提示实名认证，按页面要求完成）。
3. 部署完成后，会给出访问地址，一般是：
   - **https://你的用户名.gitee.io/my-portfolio/**

用这个链接在国内访问，通常比 GitHub Pages 快。

---

## 以后更新站点

1. 在本项目里改代码后，执行：`npm run build:gitee`
2. 再按「第三步」把新的 **`out`** 内容覆盖到 Gitee 仓库（用 Git 或网页上传），推送或保存后，Gitee Pages 会自动更新（有时需在「Gitee Pages」里点一次「更新」）。

---

## 常见问题

| 问题 | 处理 |
|------|------|
| 打开链接 404 | 确认访问地址带结尾斜杠：`https://xxx.gitee.io/my-portfolio/` |
| 页面白屏 / 资源 404 | 确认是用 `npm run build:gitee` 构建的，且把 **out 里的内容** 放在仓库根目录（或 Pages 所选的目录） |
| 仓库名不是 my-portfolio | 构建时用：`GITEE_REPO_NAME=你的仓库名 npm run build:gitee`，访问地址改为 `https://用户名.gitee.io/你的仓库名/` |
