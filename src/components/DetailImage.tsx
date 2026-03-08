"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

type StaticImageData = { src: string; height: number; width: number };

/** 详情页图片：加载失败时显示灰色占位，避免空白或裂图 */
export function DetailImage({
  src,
  alt = "",
  className,
  fill,
  priority,
}: {
  src: StaticImageData | string;
  alt?: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const onError = useCallback(() => setFailed(true), []);
  if (failed) {
    return (
      <div
        className={fill ? `absolute inset-0 ${className ?? ""}` : className}
        style={{ backgroundColor: "#e5e5e5" }}
        aria-hidden
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      fill={fill}
      priority={priority}
      onError={onError}
      unoptimized
    />
  );
}
