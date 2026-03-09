#!/usr/bin/env node
/**
 * 纯 Node 静态服务器，仅用 http + fs，不调用 os.networkInterfaces，避免沙箱/环境报错。
 * 用于本地预览 out 目录（Next 静态导出），支持 SPA 回退到 index.html。
 */
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = join(__dirname, "..", "out");
const PORT = Number(process.env.PREVIEW_PORT) || 3002;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const server = createServer((req, res) => {
  let pathname = req.url?.split("?")[0] ?? "/";
  if (pathname === "/") pathname = "/index.html";
  let filePath = join(root, pathname);
  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, "index.html");
  }

  if (!existsSync(filePath)) {
    const withIndex = join(root, pathname, "index.html");
    const indexPath = join(root, "index.html");
    if (existsSync(withIndex)) {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(readFileSync(withIndex));
      return;
    }
    if (existsSync(indexPath)) {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(readFileSync(indexPath));
      return;
    }
    res.writeHead(404);
    res.end("Not Found");
    return;
  }

  const ext = extname(filePath);
  const contentType = MIME[ext] ?? "application/octet-stream";
  res.writeHead(200, { "Content-Type": contentType });
  res.end(readFileSync(filePath));
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("");
  console.log("  Preview: http://localhost:" + PORT);
  console.log("  (Ctrl+C to stop)");
  console.log("");
});
