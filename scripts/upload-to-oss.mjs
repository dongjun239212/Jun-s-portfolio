#!/usr/bin/env node
/**
 * 将 out/ 目录内容上传到阿里云 OSS Bucket 根目录
 * 使用前请设置环境变量（或写在 .env 里，不要提交到 Git）：
 *   OSS_REGION            例如 oss-cn-hangzhou
 *   OSS_BUCKET            Bucket 名称
 *   OSS_ACCESS_KEY_ID     AccessKey ID
 *   OSS_ACCESS_KEY_SECRET AccessKey Secret
 *
 * 运行：npm run deploy:oss
 */
import OSS from "ali-oss";
import { readdir, stat } from "fs/promises";
import { join, relative } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "out");

const region = process.env.OSS_REGION;
const bucket = process.env.OSS_BUCKET;
const accessKeyId = process.env.OSS_ACCESS_KEY_ID;
const accessKeySecret = process.env.OSS_ACCESS_KEY_SECRET;

if (!region || !bucket || !accessKeyId || !accessKeySecret) {
  console.error("请设置环境变量：OSS_REGION, OSS_BUCKET, OSS_ACCESS_KEY_ID, OSS_ACCESS_KEY_SECRET");
  console.error("示例：OSS_REGION=oss-cn-hangzhou OSS_BUCKET=my-portfolio OSS_ACCESS_KEY_ID=xxx OSS_ACCESS_KEY_SECRET=xxx npm run deploy:oss");
  process.exit(1);
}

function getContentType(path) {
  const ext = path.replace(/^.*\./, "").toLowerCase();
  const mime = {
    html: "text/html; charset=utf-8",
    htm: "text/html; charset=utf-8",
    css: "text/css; charset=utf-8",
    js: "application/javascript; charset=utf-8",
    json: "application/json; charset=utf-8",
    txt: "text/plain; charset=utf-8",
    svg: "image/svg+xml",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    ico: "image/x-icon",
    woff2: "font/woff2",
    woff: "font/woff",
    ttf: "font/ttf",
    eot: "application/vnd.ms-fontobject",
  };
  return mime[ext] || "application/octet-stream";
}

async function listFiles(dir, base = "") {
  const entries = await readdir(join(dir, base), { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const rel = base ? `${base}/${e.name}` : e.name;
    const full = join(dir, rel);
    if (e.isDirectory()) {
      files.push(...(await listFiles(dir, rel)));
    } else {
      files.push(rel);
    }
  }
  return files;
}

async function main() {
  const client = new OSS({ region, bucket, accessKeyId, accessKeySecret });
  const files = await listFiles(OUT_DIR);
  console.log(`共 ${files.length} 个文件，开始上传到 oss://${bucket}/ ...`);
  let ok = 0;
  let err = 0;
  for (const rel of files) {
    try {
      const local = join(OUT_DIR, rel);
      const contentType = getContentType(rel);
      const headers = {
        "Content-Type": contentType,
        "Content-Disposition": "inline",
      };
      await client.put(rel, local, { headers });
      ok++;
      if (ok % 20 === 0) console.log(`  已上传 ${ok}/${files.length}`);
    } catch (e) {
      err++;
      console.error(`  失败: ${rel}`, e.message);
    }
  }
  console.log(`完成: 成功 ${ok}, 失败 ${err}`);
  if (err) process.exit(1);
}

main();
