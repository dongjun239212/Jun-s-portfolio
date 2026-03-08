#!/usr/bin/env node
/**
 * 压缩 src/assets 下的 PNG、JPG 图片（覆盖原文件）
 * 使用：npm run compress:images
 */
import sharp from "sharp";
import { readdir, stat, writeFile } from "fs/promises";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, "..", "src", "assets");

const MAX_WIDTH = 2400;
const MAX_HEIGHT = 2400;
const JPEG_QUALITY = 82;
const PNG_QUALITY = 85;
const PNG_COMPRESSION = 9;

async function listImages(dir, base = "") {
  const entries = await readdir(join(dir, base), { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const rel = base ? `${base}/${e.name}` : e.name;
    const full = join(dir, rel);
    if (e.isDirectory()) {
      files.push(...(await listImages(dir, rel)));
    } else {
      const ext = extname(e.name).toLowerCase();
      if ([".png", ".jpg", ".jpeg"].includes(ext)) files.push(rel);
    }
  }
  return files;
}

async function compressFile(rel) {
  const inputPath = join(ASSETS_DIR, rel);
  const ext = extname(rel).toLowerCase();
  const { size } = await stat(inputPath);
  const meta = await sharp(inputPath).metadata();
  const w = meta.width || 0;
  const h = meta.height || 0;
  let pipeline = sharp(inputPath);
  if (w > MAX_WIDTH || h > MAX_HEIGHT) {
    pipeline = pipeline.resize(MAX_WIDTH, MAX_HEIGHT, { fit: "inside", withoutEnlargement: true });
  }
  if (ext === ".png") {
    const smallPng = size < 200 * 1024;
    pipeline = pipeline.png(
      smallPng
        ? { compressionLevel: PNG_COMPRESSION, adaptiveFiltering: true }
        : { compressionLevel: PNG_COMPRESSION, quality: PNG_QUALITY, adaptiveFiltering: true }
    );
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }
  const buf = await pipeline.toBuffer();
  const newSize = buf.length;
  if (newSize < size) await writeFile(inputPath, buf);
  const finalSize = newSize < size ? newSize : size;
  const saved = ((1 - finalSize / size) * 100).toFixed(1);
  return { rel, before: size, after: finalSize, saved: parseFloat(saved), skipped: newSize >= size };
}

async function main() {
  const files = await listImages(ASSETS_DIR);
  if (files.length === 0) {
    console.log("未找到 PNG/JPG 文件");
    return;
  }
  console.log(`找到 ${files.length} 个图片，开始压缩（最大边长 ${MAX_WIDTH}px）...`);
  let totalBefore = 0;
  let totalAfter = 0;
  for (const rel of files) {
    try {
      const r = await compressFile(rel);
      totalBefore += r.before;
      totalAfter += r.after;
      const sign = r.saved >= 0 ? "-" : "+";
      const skip = r.skipped ? " [已跳过，体积未减小]" : "";
      console.log(`  ${rel}: ${(r.before / 1024).toFixed(0)}KB → ${(r.after / 1024).toFixed(0)}KB (${sign}${Math.abs(r.saved).toFixed(1)}%)${skip}`);
    } catch (e) {
      console.error(`  失败 ${rel}:`, e.message);
    }
  }
  const totalSaved = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
  console.log(`\n完成: 总大小 ${(totalBefore / 1024 / 1024).toFixed(2)}MB → ${(totalAfter / 1024 / 1024).toFixed(2)}MB (约 -${totalSaved}%)`);
}

main();
