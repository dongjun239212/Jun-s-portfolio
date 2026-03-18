"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS, SECTION_IDS } from "@/lib/navLinks";
import { SIDEBAR_NAV_LINK_ACTIVE, SIDEBAR_NAV_LINK_DEFAULT } from "@/lib/sidebarNavStyles";
import { Icon } from "@/components/Icons";

type SidebarNavProps = { basePath?: string; activeSection?: string | null };

export function SidebarNav({ basePath = "", activeSection = null }: SidebarNavProps) {
  const [activeHash, setActiveHash] = useState("");
  const fromSection = basePath === "/" && activeSection != null ? activeSection : "";

  // 1. 同步 URL hash（点击锚点、刷新等）
  useEffect(() => {
    const readHash = () => setActiveHash(typeof window !== "undefined" ? window.location.hash : "");
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, []);

  // 2. 滚动锚定：以视口 50% 为基准线，哪段包含这条线就高亮哪段，上下滚动效果一致（仅首页无 basePath 时生效）
  useEffect(() => {
    if (basePath) return;
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const updateActive = () => {
      const line = window.innerHeight / 2;
      let bestId: string | null = null;
      let bestDist = Infinity;
      for (const el of sections) {
        const rect = el.getBoundingClientRect();
        const containsLine = rect.top <= line && rect.bottom >= line;
        if (containsLine) {
          bestId = el.id;
          break;
        }
        const dist =
          line < rect.top ? rect.top - line : line > rect.bottom ? line - rect.bottom : 0;
        if (dist < bestDist) {
          bestDist = dist;
          bestId = el.id;
        }
      }
      if (bestId) setActiveHash(`#${bestId}`);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [basePath]);

  const linkClass = (isActive: boolean) =>
    isActive ? SIDEBAR_NAV_LINK_ACTIVE : SIDEBAR_NAV_LINK_DEFAULT;

  return (
    <nav className="flex w-[180px] flex-col gap-8 px-4 py-8">
      {NAV_LINKS.map(({ href, label, icon }) => {
        const sectionId = href.slice(1);
        const isActive = basePath ? fromSection === sectionId : activeHash === href;
        // 详情页用 Link 做客户端导航回首页锚点，不整页跳转，避免 404
        if (basePath) {
          return (
            <Link
              key={href}
              href={`/${href}`}
              className={linkClass(isActive)}
            >
              <Icon name={icon} size={16} className="sidebar-nav-icon" aria-hidden />
              {label}
            </Link>
          );
        }
        return (
          <a
            key={href}
            href={href}
            className={linkClass(isActive)}
          >
            <Icon name={icon} size={16} className="sidebar-nav-icon" aria-hidden />
            {label}
          </a>
        );
      })}
    </nav>
  );
}
