"use client";

import { useState, useCallback } from "react";

/** Hero 区背景图：加载失败时显示深色兜底，避免空白 */
export function HeroBackground({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  const onError = useCallback(() => setFailed(true), []);
  if (failed) {
    return <div className="absolute inset-0 size-full bg-zinc-800" aria-hidden />;
  }
  return (
    <img
      alt=""
      src={src}
      className="absolute inset-0 size-full object-cover"
      fetchPriority="high"
      decoding="async"
      onError={onError}
    />
  );
}
