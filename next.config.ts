import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const TURBOPACK_ROOT = dirname(fileURLToPath(import.meta.url));

// GitHub Pages 用 /My-new-portfolio；Gitee Pages 用 /仓库名；腾讯云静态托管用 TCLOUD_BASE_PATH；否则根路径
const basePath =
  process.env.GITHUB_PAGES === "true"
    ? "/My-new-portfolio"
    : process.env.GITEE_PAGES === "true"
      ? `/${process.env.GITEE_REPO_NAME || "my-portfolio"}`
      : (process.env.TCLOUD_BASE_PATH ?? "").replace(/\/$/, "") || "";

// 是否做 static export（导出 out 目录）
// - GitHub Pages / Gitee Pages：需要 static export
// - 其它平台（Vercel、腾讯云静态托管等）：可通过 STATIC_EXPORT=true 显式开启
const isStaticExport =
  process.env.STATIC_EXPORT === "true" ||
  process.env.GITHUB_PAGES === "true" ||
  process.env.GITEE_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" } : {}),
  basePath,
  assetPrefix: basePath || undefined,
  turbopack: {
    root: TURBOPACK_ROOT,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
