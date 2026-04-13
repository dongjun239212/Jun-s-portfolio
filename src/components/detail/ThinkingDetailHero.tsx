"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { THINKING_TOPICS } from "@/lib/thinkingTopics";

function ThinkingDetailHeroInner({ imageSrcs }: { imageSrcs: string[] }) {
  const [loadedCount, setLoadedCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const allLoaded = loadedCount >= imageSrcs.length && imageSrcs.length > 0;

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
    if (imageSrcs.length === 0) return;
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
  }, [checkComplete, imageSrcs.length]);

  useEffect(() => {
    if (imageSrcs.length === 0) return;
    const t = setTimeout(() => {
      setLoadedCount((n) => (n >= imageSrcs.length ? n : imageSrcs.length));
    }, 2500);
    return () => clearTimeout(t);
  }, [imageSrcs.length]);

  return (
    <section
      className="relative w-full shrink-0 overflow-hidden bg-[var(--surface-muted)] aspect-[6/1] max-md:aspect-[4/3]"
      aria-hidden
    >
      {imageSrcs.length > 0 ? (
        <>
          <div ref={containerRef} className="absolute inset-0" aria-hidden>
            {imageSrcs.map((src, i) => (
              <img
                key={i}
                alt={i === 0 ? "Thinking hero" : ""}
                src={src}
                className={`absolute inset-0 z-0 size-full object-cover object-center transition-[opacity,transform] duration-300 ease-out will-change-transform motion-reduce:transition-none ${allLoaded ? "opacity-100" : "opacity-0"}`}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                onLoad={onLoad}
                onError={onLoad}
              />
            ))}
            <div
              className={`absolute inset-0 z-10 bg-[var(--surface-muted)] transition-opacity duration-200 ${allLoaded ? "opacity-0" : "opacity-100"}`}
              aria-hidden
            />
          </div>
          <div className="absolute inset-0 bg-black/20" aria-hidden />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.12) 55%, rgba(255,255,255,0.00) 100%)",
            }}
            aria-hidden
          />
        </>
      ) : (
        <div className="size-full bg-[var(--surface-muted)]" />
      )}
    </section>
  );
}

export function ThinkingDetailHero() {
  const params = useSearchParams();
  const slug = params.get("thinking");

  const imageSrcs = useMemo(() => {
    const topic = THINKING_TOPICS.find((t) => t.slug === slug);
    return topic?.imageSrcs ?? [];
  }, [slug]);

  // Key forces state reset when switching topics.
  return <ThinkingDetailHeroInner key={slug ?? "none"} imageSrcs={imageSrcs} />;
}
