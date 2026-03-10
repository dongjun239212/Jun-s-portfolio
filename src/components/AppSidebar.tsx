"use client";

import Link from "next/link";
import { SidebarNav } from "@/components/SidebarNav";

type AppSidebarProps = {
  /** 当前是否为详情页（决定 logo 用 Link 回首页还是 a 锚点） */
  isDetail: boolean;
  /** 详情页时从哪个 section 进入，用于侧栏高亮 */
  detailFromSection?: string | null;
};

/**
 * 全局侧栏：logo + 导航，只写一次，在 ViewSwitcher 中统一渲染。
 */
export function AppSidebar({ isDetail, detailFromSection = null }: AppSidebarProps) {
  return (
    <aside className="sticky top-0 flex h-screen w-[220px] shrink-0 flex-col border-r border-black">
      <div className="flex flex-col border-b border-black px-5 py-10">
        {isDetail ? (
          <Link
            href="/#top"
            className="flex w-40 items-center justify-center p-2.5 no-underline text-inherit hover:opacity-80 transition-opacity"
          >
            <h1 className="whitespace-pre-wrap text-2xl font-bold leading-[1.2]">
              {`CALM `}
              {`& `}
              CRAZY
            </h1>
          </Link>
        ) : (
          <a
            href="#top"
            className="flex w-40 items-center justify-center p-2.5 cursor-pointer no-underline text-inherit hover:opacity-80 transition-opacity"
          >
            <h1 className="whitespace-pre-wrap text-2xl font-bold leading-[1.2]">
              {`CALM `}
              {`& `}
              CRAZY
            </h1>
          </a>
        )}
      </div>
      <SidebarNav basePath={isDetail ? "/" : ""} activeSection={isDetail ? detailFromSection : null} />
    </aside>
  );
}
