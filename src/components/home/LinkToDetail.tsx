"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

const HOME_SCROLL_KEY = "homeScrollY";

export function saveHomeScrollY() {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(HOME_SCROLL_KEY, String(window.scrollY));
  }
}

export function getHomeScrollY(): number | null {
  if (typeof window === "undefined") return null;
  const v = window.sessionStorage.getItem(HOME_SCROLL_KEY);
  if (v == null) return null;
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : null;
}

export function clearHomeScrollY() {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(HOME_SCROLL_KEY);
  }
}

type Props = ComponentProps<typeof Link> & { href: string };

/** 点击跳转详情前保存当前滚动位置，供返回首页时恢复 */
export function LinkToDetail({ href, onClick, ...rest }: Props) {
  return (
    <Link
      href={href}
      onClick={(e) => {
        saveHomeScrollY();
        onClick?.(e);
      }}
      {...rest}
    />
  );
}
