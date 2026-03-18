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
  const [loaded, setLoaded] = useState(false);

  const onError = useCallback(() => setFailed(true), []);

  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  if (failed) {
    return (
      <div
        className={fill ? `absolute inset-0 ${className ?? ""}` : className}
        style={{ backgroundColor: "#f5f5f5" }}
        aria-hidden
      />
    );
  }
  return (
    <div
      className={fill ? `absolute inset-0 ${className ?? ""}` : className}
      style={{ backgroundColor: "#f5f5f5" }}
      aria-hidden={alt ? undefined : true}
    >
      <Image
        src={src}
        alt={alt}
        className={loaded ? "opacity-100 transition-opacity duration-300" : "opacity-0"}
        fill={fill}
        priority={priority}
        onError={onError}
        onLoad={onLoad}
        unoptimized
      />
    </div>
  );
}
