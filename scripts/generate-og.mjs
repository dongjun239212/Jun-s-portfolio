#!/usr/bin/env node
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "..", "public", "og.png");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#171717"/>
  <text x="600" y="270" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="64" font-weight="700" fill="#fafafa">CALM &amp; CRAZY</text>
  <text x="600" y="360" text-anchor="middle" font-family="ui-sans-serif, system-ui, sans-serif" font-size="28" fill="#a3a3a3">Jun Dong · UX · E-commerce</text>
</svg>`;

const buf = await sharp(Buffer.from(svg)).png().toBuffer();
await writeFile(out, buf);
console.log("Wrote", out);
