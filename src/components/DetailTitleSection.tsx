"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CARD_BUTTON_LIGHT } from "@/lib/cardButtonStyles";
import { Icon } from "@/components/Icons";

const DEFAULT_TITLE = "Shop framework revamp";

const HOME_HREF = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`;

/** 详情页主标题区：无滚动时显示「Back to homepage」按钮 + 主标题；主标题 section 完全滚出视口后显示吸顶栏（返回 icon + 32px 标题） */
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
      {/* 吸顶栏：仅当主标题 section 完全滚出视口时显示 */}
      {showStickyBar && (
        <div
          className="fixed left-0 right-0 top-0 z-20 bg-white/50 backdrop-blur-md md:left-[220px]"
          role="banner"
        >
          <div className="mx-auto flex w-full max-w-[1680px] items-center gap-[10px] px-5 py-[30px] md:px-[60px]">
          <Link
            href={HOME_HREF}
            className="flex shrink-0 items-center justify-center no-underline text-inherit hover:opacity-70 transition-opacity"
            aria-label="Back to homepage"
          >
            <Icon name="arrow_back" size={32} className="text-black" aria-hidden />
          </Link>
          <h1 className="min-w-0 text-[24px] font-bold leading-[1.2] text-black">
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
          href={HOME_HREF}
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
