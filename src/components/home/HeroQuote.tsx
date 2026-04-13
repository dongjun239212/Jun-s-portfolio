"use client";

import { useCallback, useEffect, useState } from "react";

type Props = {
  text: string;
  className?: string;
};

export function HeroQuote({ text, className = "" }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 900);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // silent: clipboard may be unavailable in some contexts
    }
  }, [text]);

  return (
    <div className="relative w-full">
      <p
        className={`${className} cursor-default select-text`}
        onDoubleClick={copy}
        title="Double click to copy"
      >
        {text}
      </p>
      <div
        className={`pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-[6px] transition-opacity duration-200 motion-reduce:transition-none ${
          copied ? "opacity-100" : "opacity-0"
        }`}
        aria-live="polite"
      >
        Copied
      </div>
    </div>
  );
}
