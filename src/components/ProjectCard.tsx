"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { CARD_BUTTON_LIGHT } from "@/lib/cardButtonStyles";

/** Project 卡片：未加载时显示 #f5f5f5 灰色占位，加载完成后淡入，避免返回时闪现 */
export function ProjectCard({
  imageSrc,
  title,
  description,
}: {
  imageSrc: string;
  title: string;
  description: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onLoad = useCallback(() => setLoaded(true), []);
  const onError = useCallback(() => setLoaded(true), []);

  const checkComplete = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const img = el.querySelector("img");
    if (img && (img as HTMLImageElement).complete) setLoaded(true);
  }, []);

  // 从详情页返回时与 Thinking 一致：多次检查已缓存图片，避免 bfcache/lazy 不触发 onLoad 导致灰块→图片闪屏
  useEffect(() => {
    const t1 = requestAnimationFrame(() => checkComplete());
    const t2 = setTimeout(checkComplete, 50);
    const t3 = setTimeout(checkComplete, 200);
    const t4 = setTimeout(checkComplete, 400);
    const t5 = setTimeout(checkComplete, 800);
    return () => {
      cancelAnimationFrame(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [checkComplete]);

  // 兜底：超时后强制显示，避免一直卡在占位
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <article className="group relative flex flex-1 flex-col rounded-none outline-none transition-transform duration-200 ease-out hover:-translate-y-1 focus-within:ring-2 focus-within:ring-black/20 focus-within:ring-offset-2">
      <div className="absolute inset-0 z-10 bg-black/[0.03] opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none rounded-none" aria-hidden />
      <div ref={containerRef} className="relative aspect-[540/300] w-full shrink-0 overflow-hidden bg-[#f5f5f5]">
        <img
          alt=""
          src={imageSrc}
          className={`absolute inset-0 z-0 size-full object-cover transition-opacity duration-200 ${loaded ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          decoding="async"
          onLoad={onLoad}
          onError={onError}
        />
        {/* 未加载时灰色占位盖在最上层，加载完成后淡出，与 Thinking 卡片一致 */}
        <div
          className={`absolute inset-0 z-10 bg-[#f5f5f5] transition-opacity duration-200 ${loaded ? "opacity-0" : "opacity-100"}`}
          aria-hidden
        />
      </div>
      <div className="flex flex-col gap-4 p-5">
        <h3 className="text-2xl font-bold leading-[1.25]">{title}</h3>
        <p className="line-clamp-4 text-base leading-[1.3] text-black/65">
          {description}
        </p>
        <button
          type="button"
          className={CARD_BUTTON_LIGHT}
        >
          Discover more
        </button>
      </div>
    </article>
  );
}
