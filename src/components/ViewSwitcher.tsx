"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HomePage from "@/app/home/HomePage";
import { DetailPageContent } from "@/components/DetailPageContent";
import { getHomeScrollY, clearHomeScrollY } from "@/components/LinkToDetail";

function getFromParam(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("from");
}

/**
 * 首页与详情页双视图常驻 DOM，仅通过 display 切换显示。
 * - 点击「Back to homepage」返回首页：恢复前序页面的滚动位置（由 LinkToDetail 写入 sessionStorage）。
 * - 点击侧栏导航（Projects / Thinking / About me）返回首页：定位到对应 section 的初始位置（hash 锚点）。
 * - 从 Projects/Thinking 进入详情页时，侧栏高亮对应项（通过 URL from 参数传入）。
 * 使用 window.location 读取 from 参数，避免 useSearchParams 导致 Suspense 一直显示 Loading。
 */
export function ViewSwitcher() {
  const pathname = usePathname();
  const [detailFromSection, setDetailFromSection] = useState<string | null>(null);
  const isDetail = pathname === "/detail";

  useEffect(() => {
    if (isDetail) setDetailFromSection(getFromParam());
    else setDetailFromSection(null);
  }, [isDetail]);

  useEffect(() => {
    if (isDetail) {
      window.scrollTo(0, 0);
    } else {
      const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
      if (hash) {
        clearHomeScrollY();
        requestAnimationFrame(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "instant", block: "start" });
          }
        });
      } else {
        const saved = getHomeScrollY();
        clearHomeScrollY();
        if (saved != null && saved > 0) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              window.scrollTo(0, saved);
            });
          });
        }
      }
    }
  }, [isDetail]);

  return (
    <>
      <div
        style={{ display: isDetail ? "none" : "block" }}
        className="min-h-screen"
        aria-hidden={isDetail}
      >
        <HomePage />
      </div>
      <div
        style={{ display: isDetail ? "block" : "none" }}
        className="min-h-screen"
        aria-hidden={!isDetail}
      >
        <DetailPageContent detailFromSection={detailFromSection} />
      </div>
    </>
  );
}
