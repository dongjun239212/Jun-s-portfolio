"use client";

import Link from "next/link";
import { MobileNav, SidebarNav } from "@/components/layout";

type Props = {
  isDetail: boolean;
  detailFromSection: string | null;
  children: React.ReactNode;
};

export function PortfolioShell({ isDetail, detailFromSection, children }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black md:flex-row" id="top">
      <MobileNav isDetail={isDetail} detailFromSection={detailFromSection} />

      <aside className="sticky top-0 hidden h-screen w-[180px] shrink-0 flex-col border-r border-black md:flex">
        <div className="flex flex-col border-b border-black py-10">
          <Link
            href="/#top"
            className="flex w-full cursor-pointer items-center justify-start px-4 py-2.5 text-inherit no-underline transition-opacity hover:opacity-80"
          >
            <h1 className="w-full whitespace-pre-wrap px-4 text-2xl font-bold leading-[1.2]">
              CALM
              <br />
              &
              <br />
              CRAZY
            </h1>
          </Link>
        </div>
        <SidebarNav basePath={isDetail ? "/" : ""} activeSection={detailFromSection} />
      </aside>

      <div className="min-w-0 flex-1 pt-14 md:pt-0">{children}</div>
    </div>
  );
}
