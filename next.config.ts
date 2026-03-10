import type { NextConfig } from "next";

// GitHub Pages 用 /My-new-portfolio；Gitee Pages 用 /仓库名（通过 GITEE_REPO_NAME 指定）；否则根路径
const basePath =
  process.env.GITHUB_PAGES === "true"
    ? "/My-new-portfolio"
    : process.env.GITEE_PAGES === "true"
      ? `/${process.env.GITEE_REPO_NAME || "my-portfolio"}`
      : "";

// 只有在 GitHub Pages / Gitee Pages 等“纯静态托管”场景下才使用 output: "export"
// 在 Vercel 上不会设置 GITHUB_PAGES / GITEE_PAGES，因此使用 Next.js 默认输出（.next），避免构建错误
const isStaticExport =
  process.env.GITHUB_PAGES === "true" || process.env.GITEE_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" } : {}),
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
