"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/navLinks";
import { SIDEBAR_NAV_LINK_ACTIVE, SIDEBAR_NAV_LINK_DEFAULT } from "@/lib/sidebarNavStyles";
import { Icon } from "@/components/Icons";

type Props = {
  isDetail: boolean;
  detailFromSection: string | null;
};

/**
 * 小屏顶栏 + 全屏菜单，侧栏在 md 以上由 PortfolioShell 展示。
 */
export function MobileNav({ isDetail, detailFromSection }: Props) {
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [isDetail]);

  // 同步 URL hash（打开菜单时也能看到当前 section）
  useEffect(() => {
    const readHash = () => setActiveHash(typeof window !== "undefined" ? window.location.hash : "");
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, []);

  const linkClass = (isActive: boolean) =>
    `${isActive ? SIDEBAR_NAV_LINK_ACTIVE : SIDEBAR_NAV_LINK_DEFAULT} text-lg`;

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between border-b border-black bg-white px-4 md:hidden">
        <Link
          href="/#top"
          className="text-base font-bold leading-tight text-black no-underline"
          onClick={() => setOpen(false)}
        >
          CALM & CRAZY
        </Link>
        <button
          type="button"
          className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-black/15 bg-white text-black"
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          aria-label={open ? "关闭菜单" : "打开菜单"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">菜单</span>
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </header>

      {open && (
        <div
          id="mobile-nav-panel"
          className="mobile-overlay-animated fixed inset-0 z-40 bg-black/40 pt-14 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="站点导航"
          onClick={() => setOpen(false)}
        >
          <nav
            className="mobile-panel-animated flex h-[calc(100dvh-3.5rem)] flex-col gap-1 overflow-y-auto border-t border-black/10 bg-white px-3 py-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {NAV_LINKS.map(({ href, label, icon }) => {
              const sectionId = href.slice(1);
              const isActive = isDetail ? detailFromSection === sectionId : activeHash === href;
              const delayMs =
                href === "#projects" ? 30 : href === "#thinking" ? 55 : href === "#about" ? 80 : 30;
              if (isDetail) {
                return (
                  <Link
                    key={href}
                    href={`/${href}`}
                    className={linkClass(isActive)}
                    onClick={() => setOpen(false)}
                  >
                    <span
                      className="mobile-nav-item-animated inline-flex w-full items-center gap-1.5"
                      style={{ animationDelay: `${delayMs}ms` }}
                    >
                      <Icon name={icon} size={18} className="sidebar-nav-icon -translate-y-[0.5px]" aria-hidden />
                      {label}
                    </span>
                  </Link>
                );
              }
              return (
                <a key={href} href={href} className={linkClass(isActive)} onClick={() => setOpen(false)}>
                  <span
                    className="mobile-nav-item-animated inline-flex w-full items-center gap-1.5"
                    style={{ animationDelay: `${delayMs}ms` }}
                  >
                    <Icon name={icon} size={18} className="sidebar-nav-icon -translate-y-[0.5px]" aria-hidden />
                    {label}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
