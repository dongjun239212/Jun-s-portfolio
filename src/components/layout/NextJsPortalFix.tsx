"use client";

import { useEffect } from "react";

/**
 * Next.js 开发时注入的 nextjs-portal 有时会被放在错误位置（如 top: 11415px），
 * 用脚本强制其固定在视口左上角；轮询以覆盖运行时被改写的样式。
 */
export function NextJsPortalFix() {
  useEffect(() => {
    const fix = () => {
      const portal = document.querySelector("nextjs-portal");
      if (portal && portal instanceof HTMLElement) {
        portal.style.setProperty("position", "fixed", "important");
        portal.style.setProperty("top", "0px", "important");
        portal.style.setProperty("left", "0px", "important");
        portal.style.setProperty("margin", "0", "important");
        portal.style.setProperty("z-index", "99999", "important");
      }
    };

    fix();
    const id = setInterval(fix, 800);
    return () => clearInterval(id);
  }, []);

  return null;
}
