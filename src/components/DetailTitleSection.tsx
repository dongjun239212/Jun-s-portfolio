"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CARD_BUTTON_LIGHT } from "@/lib/cardButtonStyles";
import { TEXT_SECTION_TITLE } from "@/lib/typography";
import { Icon } from "@/components/layout";
import { THINKING_TOPICS } from "@/lib/thinkingTopics";

const DEFAULT_TITLE = "Shop framework revamp";

/** 详情页主标题区：无滚动时显示「Back to homepage」按钮 + 主标题；主标题 section 完全滚出视口后显示吸顶栏（返回 icon + 32px 标题）。用 Link 做客户端导航，不整页跳转，避免 404。 */
export function DetailTitleSection({
  maxWidthClass = "max-w-[1680px]",
  innerMaxWidthClass,
}: {
  maxWidthClass?: string;
  /** Optionally constrain inner content for reading pages (e.g. max-w-[96ch]). */
  innerMaxWidthClass?: string;
}) {
  const params = useSearchParams();

  const { title, readingTimeHint } = useMemo(() => {
    const thinking = params.get("thinking");
    const from = params.get("from");
    const titleParam = params.get("title") ?? DEFAULT_TITLE;

    if (from === "thinking" && thinking) {
      const topic = THINKING_TOPICS.find((t) => t.slug === thinking);
      return {
        title: topic?.title ?? titleParam,
        readingTimeHint: topic?.article.readingTimeHint ?? null,
      };
    }

    return { title: titleParam, readingTimeHint: null };
  }, [params]);
  const sectionRef = useRef<HTMLElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 期望行为：
        // 1) 主标题在视口“下方”（首屏时常见）=> 不显示吸顶条
        // 2) 主标题已从视口顶部“往上滚出”（越过顶部）=> 显示吸顶条
        // 3) 主标题重新回到视口 => 隐藏吸顶条
        //
        // IntersectionObserver 的 isIntersecting 为 false 仅表示“不相交/完全离开”；
        // 还需要 boundingClientRect.top 来区分“在下方”还是“在上方”。
        if (entry.isIntersecting) {
          setShowStickyBar(false);
          return;
        }

        const isAboveViewport = entry.boundingClientRect.top < 0;
        setShowStickyBar(isAboveViewport);
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
          className="fixed right-0 z-10 bg-white/95 shadow-[0_2px_8px_rgba(0,0,0,0.03)] backdrop-blur-[4px] sticky-bar-animated left-0 top-14 md:left-[180px] md:top-0"
          role="banner"
        >
          <div
            className={`mx-auto flex w-full ${maxWidthClass} flex-col items-start gap-2 px-5 py-2.5 md:gap-4 md:px-[60px] md:py-[24px]`}
            style={{ width: "100%" }}
          >
            <div className={innerMaxWidthClass ? `mx-auto w-full ${innerMaxWidthClass}` : "w-full"}>
              <Link
                href="/"
                className="inline-flex max-w-full items-center text-xs font-medium text-neutral-500 no-underline transition-colors hover:text-red-600 sm:text-sm"
                aria-label="Back to homepage"
              >
                <span className="truncate sm:hidden">Back</span>
                <span className="truncate max-sm:hidden">Back to homepage</span>
              </Link>
              <h1 className="min-w-0 w-full text-lg font-bold leading-snug text-black md:text-2xl">
                {title}
              </h1>
              {/** 吸顶条里不展示阅读时长提示，避免信息噪音 */}
            </div>
          </div>
        </div>
      )}

      {/* 主标题 section：无滚动时展示；随页面滚动可完全离开视口 */}
      <section
        ref={sectionRef}
        className="flex flex-col bg-white px-5 pt-[60px] pb-[40px] md:px-[60px]"
      >
        <div className={`mx-auto w-full ${maxWidthClass}`}>
          <div className={innerMaxWidthClass ? `mx-auto w-full ${innerMaxWidthClass}` : "w-full"}>
            <Link
              href="/"
              className={`${CARD_BUTTON_LIGHT} mb-5 inline-flex items-center gap-1.5 no-underline text-black px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm`}
              aria-label="Back to homepage"
            >
              <Icon name="arrow_back" size={18} className="shrink-0 text-black" aria-hidden />
              <span className="sm:hidden">Back</span>
              <span className="max-sm:hidden">Back to homepage</span>
            </Link>
            <h1 className={`min-w-0 ${TEXT_SECTION_TITLE}`}>
              {title}
            </h1>
            {readingTimeHint && (
              <p className="mt-2 text-sm leading-relaxed text-black/60">
                {readingTimeHint}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
