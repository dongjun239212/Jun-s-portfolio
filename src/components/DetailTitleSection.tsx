"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CARD_BUTTON_LIGHT } from "@/lib/cardButtonStyles";
import { Icon } from "@/components/Icons";

const DEFAULT_TITLE = "Shop framework revamp";

/** 详情页主标题区：无滚动时显示「Back to homepage」按钮 + 主标题；主标题 section 完全滚出视口后显示吸顶栏（返回 icon + 32px 标题）。用 Link 做客户端导航，不整页跳转，避免 404。 */
export function DetailTitleSection() {
  const [title, setTitle] = useState(DEFAULT_TITLE);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setTitle(params.get("title") ?? DEFAULT_TITLE);
  }, []);
  const sectionRef = useRef<HTMLElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const HYSTERESIS = 8;
    let ticking = false;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const bottom = rect.bottom;
      setShowStickyBar((prev) => {
        if (bottom < -HYSTERESIS) return true;
        if (bottom > HYSTERESIS) return false;
        return prev;
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* 吸顶栏：Figma 279-70715 — 白底、上下结构（胶囊按钮 + 标题）、底部细线 */}
      {showStickyBar && (
        <div
          className="fixed left-0 right-0 top-0 z-20 border-b border-black/10 bg-white md:left-[220px]"
          role="banner"
        >
          <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-[8px] items-start px-5 py-[14px] md:px-[60px]">
            <Link
              href="/"
              className="flex h-[28px] items-center justify-center gap-1 rounded-full bg-black/5 px-[7px] py-[8px] no-underline text-black hover:bg-black/10 transition-colors text-[13px] font-semibold leading-[1.3]"
              aria-label="Back to homepage"
            >
              <Icon name="arrow_back" size={14} className="shrink-0 text-black" aria-hidden />
              <span>Back to homepage</span>
            </Link>
            <h1 className="min-w-0 text-[24px] font-bold leading-[1.25] text-black">
              {title}
            </h1>
          </div>
        </div>
      )}

      {/* 主标题 section：无滚动时展示；随页面滚动可完全离开视口 */}
      <section
        ref={sectionRef}
        className="flex flex-col bg-white px-5 pt-[60px] pb-[40px] md:px-[60px]"
      >
        <Link
          href="/"
          className={`${CARD_BUTTON_LIGHT} mb-5 inline-flex items-center gap-2 no-underline text-black`}
          aria-label="Back to homepage"
        >
          <Icon name="arrow_back" size={20} className="shrink-0 text-black" aria-hidden />
          <span>Back to homepage</span>
        </Link>
        <h1 className="min-w-0 text-[48px] font-bold leading-[1.2] text-black">
          {title}
        </h1>
      </section>
    </>
  );
}
