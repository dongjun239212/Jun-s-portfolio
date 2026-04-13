"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { CARD_BUTTON_DARK } from "@/lib/cardButtonStyles";

/** Thinking 卡片：图片加载完成后淡入；从详情页返回时通过多次检查已缓存图片避免不显示 */
export function ThinkingCard({
  title,
  imageSrcs,
  gradientFrom,
  blurb,
}: {
  title: string;
  imageSrcs: string[];
  gradientFrom: string;
  blurb: string;
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

  useEffect(() => {
    const t = setTimeout(() => {
      setLoadedCount((n) => (n >= imageSrcs.length ? n : imageSrcs.length));
    }, 3000);
    return () => clearTimeout(t);
  }, [imageSrcs.length]);

  return (
    <article className="group relative flex aspect-[300/400] flex-col justify-end overflow-hidden rounded-none bg-zinc-800 px-5 pb-6 pt-[224px] outline-none transition-transform transition-shadow duration-200 ease-out hover:-translate-y-1 hover:shadow-lg focus-within:shadow-lg focus-within:ring-2 focus-within:ring-black/20 focus-within:ring-offset-2">
      <div ref={containerRef} className="pointer-events-none absolute inset-0 bg-[var(--surface-muted)]" aria-hidden>
        {imageSrcs.map((src, i) => (
          <img
            key={i}
            alt={i === 0 ? title : ""}
            src={src}
            className={`absolute inset-0 z-0 size-full object-cover transition-[opacity,transform] duration-300 ease-out will-change-transform motion-reduce:transition-none group-hover:scale-[1.02] ${allLoaded ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
            decoding="async"
            onLoad={onLoad}
            onError={onLoad}
          />
        ))}
        <div
          className={`absolute inset-0 z-10 bg-[var(--surface-muted)] transition-opacity duration-200 ${allLoaded ? "opacity-0" : "opacity-100"}`}
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
        <h3 className="text-2xl font-bold leading-[1.25] text-white sm:text-3xl">{title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-white/80 md:text-base">{blurb}</p>
        <span className={CARD_BUTTON_DARK} aria-hidden="true">
          Discover more
        </span>
      </div>
    </article>
  );
}
