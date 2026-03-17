"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CARD_BUTTON_LIGHT } from "@/lib/cardButtonStyles";
import { TEXT_SECTION_TITLE } from "@/lib/typography";
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
    if (!section || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 当主标题 section 完全滚出视口时才展示吸顶条，避免频繁抖动
        setShowStickyBar(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.01,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* 吸顶栏：仅当主标题 section 完全滚出视口时显示 */}
      {showStickyBar && (
        <div
          className="fixed top-0 right-0 left-[180px] z-10 bg-white/95 shadow-[0_2px_8px_rgba(0,0,0,0.03)] backdrop-blur-[4px] sticky-bar-animated"
          role="banner"
        >
          <div
            className="mx-auto flex w-full max-w-[1680px] flex-col items-start gap-4 px-5 py-3 md:px-[60px] md:py-[24px]"
            style={{ width: "100%" }}
          >
            <Link
              href="/"
              className={`${CARD_BUTTON_LIGHT} inline-flex items-center gap-2 no-underline text-black`}
              aria-label="Back to homepage"
            >
              <Icon name="arrow_back" size={20} className="shrink-0 text-black" aria-hidden />
              <span>Back to homepage</span>
            </Link>
            <h1 className={`min-w-0 text-xl font-bold leading-tight text-black md:text-2xl`}>
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
        <h1 className={`min-w-0 ${TEXT_SECTION_TITLE}`}>
          {title}
        </h1>
      </section>
    </>
  );
}
