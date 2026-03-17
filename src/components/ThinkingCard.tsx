"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { BODY_PRIMARY, TEXT_SECTION_TITLE } from "@/lib/typography";

/** Thinking 卡片：图片加载完成后淡入；从详情页返回时通过多次检查已缓存图片避免不显示 */
export function ThinkingCard({
  title,
  imageSrcs,
  gradientFrom,
}: {
  title: string;
  imageSrcs: string[];
  gradientFrom: string;
}) {
  const [loadedCount, setLoadedCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const allLoaded = loadedCount >= imageSrcs.length;

  const onLoad = useCallback(() => {
    setLoadedCount((n) => Math.min(n + 1, imageSrcs.length));
  }, [imageSrcs.length]);

  const checkComplete = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const imgs = el.querySelectorAll("img");
    if (imgs.length === 0) return;
    const complete = Array.from(imgs).filter((img) => (img as HTMLImageElement).complete).length;
    if (complete === imgs.length) setLoadedCount(imageSrcs.length);
  }, [imageSrcs.length]);

  // 从详情页返回时：DOM 就绪后多次检查已缓存图片，避免 bfcache/lazy 导致不触发 onLoad
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

  // 兜底：超时后强制显示，避免因个别图片失败或未触发 onLoad 一直卡在占位
  useEffect(() => {
    const t = setTimeout(() => {
      setLoadedCount((n) => (n >= imageSrcs.length ? n : imageSrcs.length));
    }, 3000);
    return () => clearTimeout(t);
  }, [imageSrcs.length]);

  return (
    <article className="group relative flex aspect-[300/400] flex-col justify-end overflow-hidden rounded-none outline-none transition-transform transition-shadow duration-200 ease-out hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-black/20 focus-within:ring-offset-2 focus-within:shadow-lg px-5 pb-6 pt-[224px] bg-zinc-800">
      <div ref={containerRef} className="absolute inset-0 pointer-events-none bg-[#f5f5f5]" aria-hidden>
        {/* 底层灰块 + 图片层：未全部加载时透明，避免出现马赛克或模糊 */}
        {imageSrcs.map((src, i) => (
          <img
            key={i}
            alt=""
            src={src}
            className={`absolute inset-0 z-0 size-full object-cover transition-opacity duration-200 ${allLoaded ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
            decoding="async"
            onLoad={onLoad}
            onError={onLoad}
          />
        ))}
        {/* 未加载时灰色占位盖在最上层，加载完成后淡出，与 Project 卡片一致 */}
        <div
          className={`absolute inset-0 z-10 bg-[#f5f5f5] transition-opacity duration-200 ${allLoaded ? "opacity-0" : "opacity-100"}`}
          aria-hidden
        />
        <div
          className="absolute inset-0 transition-opacity duration-200 group-hover:opacity-90"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, transparent ${gradientFrom}, black 100%)`,
          }}
        />
      </div>
      <div className="relative z-10 flex flex-col gap-4 transition-transform duration-200 ease-out group-hover:-translate-y-1">
        <h3 className="text-2xl font-bold leading-[1.25] text-white sm:text-3xl">
          {title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-white/80 md:text-base">
          With the increasing complexity of stock management, implementing an upgraded
          inventory solution is critical. This new system will enhance tracking accuracy,
          automate replenishment processes, and provide real-time analytics.
        </p>
        <button
          type="button"
          className="w-fit rounded-full bg-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/50"
        >
          Discover more
        </button>
      </div>
    </article>
  );
}
