"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { THINKING_TOPICS, type ThinkingTopic } from "@/lib/thinkingTopics";
import { BODY_PRIMARY, TEXT_SUBTITLE } from "@/lib/typography";

function findTopic(slug: string | null): ThinkingTopic | null {
  if (!slug) return null;
  return THINKING_TOPICS.find((t) => t.slug === slug) ?? null;
}

function slugifyHeading(input: string) {
  return input
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ThinkingDetailContent() {
  const params = useSearchParams();
  const slug = params.get("thinking");
  const topic = useMemo(() => findTopic(slug) ?? null, [slug]);

  if (!topic) {
    return (
      <section className="flex flex-col gap-6 px-5 py-[60px] md:px-[60px]">
        <h2 className={TEXT_SUBTITLE}>Thinking</h2>
        <p className={BODY_PRIMARY}>
          This article couldn&apos;t be found. Please return to the homepage and open a Thinking card again.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-black/5 px-4 py-2 text-sm font-semibold text-black no-underline transition-colors hover:bg-black/10"
          >
            Back to homepage
          </Link>
        </div>
      </section>
    );
  }

  const topics = THINKING_TOPICS;
  const currentIndex = topics.findIndex((t) => t.slug === topic.slug);
  const prev = currentIndex > 0 ? topics[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null;

  const detailHref = (t: ThinkingTopic) =>
    `/detail?from=thinking&thinking=${encodeURIComponent(t.slug)}&title=${encodeURIComponent(t.title)}`;

  return (
    <article id="thinking-article" className="flex flex-col gap-10">
      <section className="flex flex-col gap-4 px-5 py-[60px] md:px-[60px]">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="mx-auto max-w-[96ch]">
            <div className="mt-0 mb-0 rounded-none bg-[var(--surface-muted)] p-5 md:p-7">
              <h2 className={TEXT_SUBTITLE}>Summary</h2>
              <p className={`mt-3 ${BODY_PRIMARY} font-semibold italic`}>{topic.blurb}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-12 md:px-[60px]">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="mx-auto max-w-[96ch]">
            <div className="flex flex-col gap-10">
              {topic.article.sections.map((section, idx) => {
                const id = slugifyHeading(section.heading);
                return (
                  <div key={idx} className="flex flex-col gap-4 pt-8 first:pt-0">
                    <h2 id={id} className={`${TEXT_SUBTITLE} scroll-mt-24`}>
                      {section.heading}
                    </h2>
                    <div className="flex flex-col gap-5">
                      {section.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className={`${BODY_PRIMARY} break-words`}>
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <nav className="mt-14 grid grid-cols-1 gap-4 border-t border-black/10 pt-8 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={detailHref(prev)}
                  className="group flex flex-col gap-1 rounded-none bg-[var(--surface-muted)] p-4 no-underline transition-[transform,background-color,color] duration-200 ease-out hover:bg-red-500/[0.06] active:scale-[0.985] active:bg-red-500/[0.10] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40"
                >
                  <span className="text-xs font-semibold text-black/60">Previous</span>
                  <span className="text-base font-bold leading-snug text-black group-hover:text-red-600">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <div className="rounded-none bg-[var(--surface-muted)] p-4 opacity-60">
                  <span className="text-xs font-semibold text-black/60">Previous</span>
                  <div className="mt-1 text-base font-bold leading-snug text-black/50">None</div>
                </div>
              )}
              {next ? (
                <Link
                  href={detailHref(next)}
                  className="group flex flex-col gap-1 rounded-none bg-[var(--surface-muted)] p-4 no-underline transition-[transform,background-color,color] duration-200 ease-out hover:bg-red-500/[0.06] active:scale-[0.985] active:bg-red-500/[0.10] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40"
                >
                  <span className="text-xs font-semibold text-black/60">Next</span>
                  <span className="text-base font-bold leading-snug text-black group-hover:text-red-600">
                    {next.title}
                  </span>
                </Link>
              ) : (
                <div className="rounded-none bg-[var(--surface-muted)] p-4 opacity-60">
                  <span className="text-xs font-semibold text-black/60">Next</span>
                  <div className="mt-1 text-base font-bold leading-snug text-black/50">None</div>
                </div>
              )}
            </nav>
          </div>
        </div>
      </section>
    </article>
  );
}

