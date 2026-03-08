import type { NextConfig } from "next";

// GitHub Pages 用 /My-new-portfolio；Gitee Pages 用 /仓库名（通过 GITEE_REPO_NAME 指定）；否则根路径
const basePath = process.env.GITHUB_PAGES === "true"
  ? "/My-new-portfolio"
  : process.env.GITEE_PAGES === "true"
    ? `/${process.env.GITEE_REPO_NAME || "my-portfolio"}`
    : "";

const nextConfig: NextConfig = {
  output: "export",
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
