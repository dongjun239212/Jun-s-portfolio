/**
 * 项目详情页内容 - 供视图切换复用
 */

import { type ReactNode, Suspense } from "react";
import type { StaticImageData } from "next/image";
import { DetailImage, DetailTitleSection, ThinkingDetailContent, ThinkingDetailHero } from "@/components/detail";
import detailHero from "@/assets/detail/detail-hero.png";
import detailUserResearch from "@/assets/detail/detail-user-research.png";
import detailData1 from "@/assets/detail/detail-data-1.png";
import detailData2 from "@/assets/detail/detail-data-2.png";
import detailCompetitor1 from "@/assets/detail/detail-competitor-1.png";
import detailCompetitor2 from "@/assets/detail/detail-competitor-2.png";
import detailProposalMain from "@/assets/detail/detail-proposal-main.png";
import detailStrategy1a from "@/assets/detail/detail-strategy-1a.png";
import detailStrategy1b from "@/assets/detail/detail-strategy-1b.png";
import detailStrategy1c from "@/assets/detail/detail-strategy-1c.png";
import detailStrategy1d from "@/assets/detail/detail-strategy-1d.png";
import detailStrategy1e from "@/assets/detail/detail-strategy-1e.png";
import detailStrategy1f from "@/assets/detail/detail-strategy-1f.png";
import detailStrategy2a from "@/assets/detail/detail-strategy-2a.png";
import detailStrategy2b from "@/assets/detail/detail-strategy-2b.png";
import detailStrategy3a from "@/assets/detail/detail-strategy-3a.png";
import detailStrategy3b from "@/assets/detail/detail-strategy-3b.png";
import { BODY_PRIMARY, TEXT_LABEL, TEXT_SECTION_TITLE, TEXT_SUBTITLE } from "@/lib/typography";

type DetailPageContentProps = { detailFromSection?: string | null };

const GOAL_BLOCKS = [
  {
    title: "Business goals",
    description:
      "Through the end-to-end experience upgrade of the store, strengthening entry perception and improving service efficiency, we can achieve precise matching between traffic intent and service scenarios, ultimately driving long-term and large-scale growth of GMV for key merchants.",
  },
  {
    title: "Design goals",
    description:
      "Through experience optimization from the store entrance to the store's service delivery and exploration of design opportunity points, we help upgrade the store's business model, ultimately achieving the win-win goal of business GMV growth and user experience optimization.",
  },
  {
    title: "Success metrics",
    description:
      "Store GMV +X%, Store CO & IPO +X%, store NPSr (brand perception/aesthetics) +X%.",
  },
] as const;

const IMPLEMENT_RHYTHM_BLOCKS = [
  {
    title: "Business goals",
    description:
      "Through the end-to-end experience upgrade of the store, strengthening entry perception and improving service efficiency, we can achieve precise matching between traffic intent and service scenarios.",
  },
  {
    title: "Design goals",
    description:
      "Through experience optimization from the store entrance to the store's service delivery, we help upgrade the store's business model.",
  },
  {
    title: "Success metrics",
    description:
      "Store GMV +X%, Store CO & IPO +X%, store NPSr (brand perception/aesthetics) +X%.",
  },
] as const;

type DetailSectionProps = {
  title: string;
  children: ReactNode;
  sectionClassName?: string;
  contentClassName?: string;
};

function DetailSection({
  title,
  children,
  sectionClassName = "gap-4",
  contentClassName = "gap-4",
}: DetailSectionProps) {
  return (
    <section className={`flex flex-col px-5 py-[16px] md:px-[60px] ${sectionClassName}`}>
      <div className="mx-auto w-full max-w-[1440px]">
        <div className={`mx-auto flex max-w-[96ch] flex-col ${contentClassName}`}>
          <h2 className={TEXT_SECTION_TITLE}>{title}</h2>
          {children}
        </div>
      </div>
    </section>
  );
}

function DetailTextBlock({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className={TEXT_SUBTITLE}>{title}</h3>
      <p className={BODY_PRIMARY}>{description}</p>
    </div>
  );
}

function DetailImageBlock({
  src,
  wrapperClassName = "relative w-full overflow-hidden rounded-none",
  aspectRatio = "540/300",
}: {
  src: StaticImageData;
  wrapperClassName?: string;
  aspectRatio?: string;
}) {
  return (
    <div className={wrapperClassName} style={{ aspectRatio }} aria-hidden>
      <DetailImage src={src} alt="" className="object-cover object-center" fill />
    </div>
  );
}

function DetailImagePair({
  leftSrc,
  rightSrc,
  rowClassName = "flex gap-3 md:gap-4",
  itemClassName = "relative min-w-0 flex-1 overflow-hidden",
  aspectRatio = "540/300",
}: {
  leftSrc: StaticImageData;
  rightSrc: StaticImageData;
  rowClassName?: string;
  itemClassName?: string;
  aspectRatio?: string;
}) {
  return (
    <div className={rowClassName}>
      <DetailImageBlock src={leftSrc} wrapperClassName={itemClassName} aspectRatio={aspectRatio} />
      <DetailImageBlock src={rightSrc} wrapperClassName={itemClassName} aspectRatio={aspectRatio} />
    </div>
  );
}

export function DetailMain({ detailFromSection = null }: DetailPageContentProps) {
  const isThinkingDetail = detailFromSection === "thinking";
  return (
      <main className="min-w-0 flex-1 flex flex-col w-full">
        {isThinkingDetail ? (
          <ThinkingDetailHero />
        ) : (
          <section
            className="relative w-full shrink-0 overflow-hidden bg-[var(--surface-muted)] aspect-[6/1] max-md:aspect-[4/3]"
            aria-hidden
          >
            <DetailImage src={detailHero} alt="" className="object-cover object-center size-full" fill priority />
            <div className="absolute inset-0 bg-black/20" aria-hidden />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.12) 55%, rgba(255,255,255,0.00) 100%)",
              }}
              aria-hidden
            />
          </section>
        )}
        <div className="flex w-full max-w-[1680px] flex-1 flex-col mx-auto pb-[120px]">
          <Suspense
            fallback={
              <section className="flex flex-col bg-white px-5 pt-[60px] pb-[40px] md:px-[60px]">
                <div className="h-20 w-64 animate-pulse rounded bg-black/5" />
              </section>
            }
          >
            <DetailTitleSection
              maxWidthClass="max-w-[1440px]"
              innerMaxWidthClass="max-w-[96ch]"
            />
          </Suspense>
          {isThinkingDetail ? (
            <ThinkingDetailContent />
          ) : (
            <>
              <DetailSection title="Background" contentClassName="gap-3">
                <p className={BODY_PRIMARY}>
                  Based on the extensive growth in the past two years through various measures to expand
                  traffic and entry points and to complete basic functions, the overall data target of
                  surpassing Douyin&apos;s share has been achieved (TTS store GMV accounts for 10.5% of
                  the overall market, while Douyin store GMV accounts for about 7% of the overall
                  market). In order to make the store&apos;s private domain mentality more in line with
                  local user habits, further leverage the attractiveness of stores, especially strategic
                  key merchants, to new customers and the stickiness to old customers&apos; repeat
                  purchases through refined experience design, systematic Data Analysis and thinking have
                  been conducted on the internal and external links of the store to seek some new growth
                  opportunities.
                </p>
              </DetailSection>
              <DetailSection title="Goals">
                <div className="flex flex-col gap-6">
                  {GOAL_BLOCKS.map((block) => (
                    <DetailTextBlock key={block.title} title={block.title} description={block.description} />
                  ))}
                </div>
              </DetailSection>
              <section className="flex flex-col gap-10 px-5 py-[16px] md:px-[60px] text-left">
                <div className="mx-auto w-full max-w-[1440px]">
                  <div className="mx-auto max-w-[96ch] flex flex-col gap-10">
                    <div className="flex flex-col items-start gap-6">
                      <h2 className={TEXT_SECTION_TITLE}>Design analysis</h2>
                      <p className={BODY_PRIMARY}>
                        We conduct systematic analysis and summary from three dimensions: User Research
                        reports, User Data Analysis, and analysis of non-China DTC competing products. While
                        extracting core highlights, we also sort out and form theoretical research basis to
                        support the subsequent iteration of the product.
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-10">
                      <div className="flex w-full flex-col items-start gap-6">
                        <h3 className={TEXT_SUBTITLE}>User research perspective</h3>
                        <div className="flex w-full flex-col items-start gap-3 text-left">
                          <p className={TEXT_LABEL}>Insights</p>
                          <ol className="detail-list list-decimal space-y-3 text-left text-base leading-relaxed text-black/80">
                            <li>The FYP scenario remains one of the most valuable channels for attracting customers into stores, and how to enhance store perception in content scenarios is worth exploring.</li>
                            <li>The store grading logic should be as clear and simple as possible, and should not blindly copy the Chinese grading system.</li>
                            <li>The brand/basic perception and structure of the store should be as closely aligned with the DTC website as possible to reduce users&apos; understanding costs.</li>
                          </ol>
                        </div>
                        <DetailImageBlock src={detailUserResearch} />
                      </div>
                      <div className="flex w-full flex-col items-start gap-6">
                        <h3 className={TEXT_SUBTITLE}>Data performance perspective</h3>
                        <div className="flex w-full flex-col items-start gap-6">
                          <div className="flex w-full flex-col items-start gap-3 text-left">
                            <p className={TEXT_LABEL}>Insights- entrance</p>
                            <ol className="detail-list list-decimal space-y-3 text-left text-base leading-relaxed text-black/80">
                              <li>The store entrance with high conversion and high exposure should provide more refined trust information and value points to attract users to enter the store.</li>
                              <li>Post-purchase scenarios should provide more follow-up mental information, such as adding store updates to frequently shopped stores in the order list.</li>
                              <li>The content and recommendation fields have high conversion efficiency, can expand more store entry forms, and increase in-store traffic.</li>
                            </ol>
                          </div>
                          <div className="flex w-full flex-col items-start gap-3 text-left">
                            <p className={TEXT_LABEL}>Insights- landing page</p>
                            <ol className="detail-list list-decimal space-y-3 text-left text-base leading-relaxed text-black/70">
                              <li>Strengthen in-store product search capabilities, increase the weight of in-store search and classification entry points, streamline classification levels, and enable stores with a large number of products to be &quot;more enjoyable to browse and quicker to find products&quot;.</li>
                              <li>The distinction between branded and non-branded stores has increased, and users place different emphases on trust in branded and non-branded stores. Therefore, greater differentiation should be made in information presentation.</li>
                              <li>Strengthen the penetration of marketing promotion information. The default decoration components should include marketing components such as flash sales, BMSM, etc.</li>
                              <li>Provide returning customers with a shorter path back to the store, offer quick follow-up entry points and associated recommendations based on historical behavior.</li>
                            </ol>
                          </div>
                        </div>
                        <DetailImagePair
                          leftSrc={detailData1}
                          rightSrc={detailData2}
                          rowClassName="flex w-full gap-5"
                          itemClassName="relative min-h-[200px] min-w-0 flex-1 shrink-0 overflow-hidden"
                        />
                      </div>
                      <div className="flex w-full flex-col items-start gap-6">
                        <h3 className={TEXT_SUBTITLE}>Competitor perspective</h3>
                        <div className="flex w-full flex-col items-start gap-3 text-left">
                          <p className={TEXT_LABEL}>Insights- entrance</p>
                          <ol className="detail-list list-decimal space-y-3 text-left text-base leading-relaxed text-black/80">
                            <li>As a platform-based product, TTS can refer more to the framework of platform-based products in terms of large-scale structure and functional division.</li>
                            <li>The display of trust-related information is particularly important. Brand stores need to showcase not only products but also brand propositions, stories, and styles.</li>
                            <li>For stores with renovation capabilities, TTS&apos;s renovation needs to break away from the existing templates and provide more flexible and configurable renovation structures.</li>
                            <li>For users at different stages and with different intentions when entering the store, more accurate and refined service capabilities need to be provided.</li>
                          </ol>
                        </div>
                        <div className="flex w-full flex-col gap-6">
                          <DetailImageBlock
                            src={detailCompetitor1}
                            wrapperClassName="relative min-h-[200px] w-full shrink-0 overflow-hidden"
                          />
                          <DetailImageBlock
                            src={detailCompetitor2}
                            wrapperClassName="relative min-h-[200px] w-full shrink-0 overflow-hidden"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
          <section className="flex flex-col gap-10 px-5 py-[16px] md:px-[60px]">
            <div className="mx-auto w-full max-w-[1440px]">
              <div className="mx-auto max-w-[96ch] flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <h2 className={TEXT_SECTION_TITLE}>Design Strategies</h2>
              <p className={BODY_PRIMARY}>
                Based on the above user research, data, and competing product analysis, in terms of
                design objectives, we mainly aim to help upgrade the business model of stores by
                optimizing the experience from the store entry point to the store&apos;s service
                reception and exploring design opportunities. Therefore, in terms of design strategy,
                we divide this end-to-end proposal into three major directions: optimization of the
                current store entrance and expansion of more store entrances; optimization of in-store
                service reception efficiency and strengthening trust perception; and exploration of
                the value of store decoration.
              </p>
            </div>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <h3 className={TEXT_SUBTITLE}>Strategy 1: Optimization of the current store entrance and expansion of more store entrances</h3>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <p className={TEXT_LABEL}>Build a systematic and comprehensive store grading system:</p>
                    <p className={BODY_PRIMARY}>Based on the latest strategic decisions, make systematic distinctions among brands, distributors, large DTC merchants, and ordinary merchants. Meanwhile, establish the representation of merchants with different identity systems in the overall E2E link, especially in the post-purchase link.</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className={TEXT_LABEL}>Enhance entry efficiency, expand store entry traffic:</p>
                    <p className={BODY_PRIMARY}>Optimize some store entrances with high traffic and high conversion rates, strengthen recall and repurchase, and improve store entry efficiency. Discover more valuable store entrances to further expand store entry traffic.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <h3 className={TEXT_SUBTITLE}>Strategy 2: The store undertakes efficiency optimization and trust perception enhancement.</h3>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <p className={TEXT_LABEL}>Store framework structure reconstruction:</p>
                    <p className={BODY_PRIMARY}>Adjust the overall store framework structure, reasonably divide store functions based on different functional characteristics, build a flexible, scalable, and reliable store framework to meet users&apos; diverse shopping intentions.</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className={TEXT_LABEL}>Enhance entry efficiency, expand store entry traffic:</p>
                    <p className={BODY_PRIMARY}>Optimize some store entrances with high traffic and high conversion rates, strengthen recall and repurchase, and improve store entry efficiency.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <h3 className={TEXT_SUBTITLE}>Strategy 3: Exploration of the value of store decoration</h3>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <p className={TEXT_LABEL}>Store framework structure reconstruction:</p>
                    <p className={BODY_PRIMARY}>Adjust the overall store framework structure, reasonably divide store functions based on different functional characteristics, build a flexible, scalable, and reliable store framework.</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className={TEXT_LABEL}>Enhance entry efficiency, expand store entry traffic:</p>
                    <p className={BODY_PRIMARY}>Optimize some store entrances with high traffic and high conversion rates, strengthen recall and repurchase, and improve store entry efficiency.</p>
                  </div>
                </div>
              </div>
            </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col gap-10 px-5 py-[16px] md:px-[60px]">
            <div className="mx-auto w-full max-w-[1440px]">
              <div className="mx-auto max-w-[96ch] flex flex-col gap-6">
                <h2 className={TEXT_SECTION_TITLE}>Design proposal</h2>
            <DetailImageBlock src={detailProposalMain} />
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <h3 className={TEXT_SUBTITLE}>Strategy 1: Optimization of the current store entrance and expansion of more store entrances</h3>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <p className={TEXT_LABEL}>Build a systematic and comprehensive store grading system:</p>
                    <p className={BODY_PRIMARY}>Based on the latest strategic decisions, make systematic distinctions among brands, distributors, large DTC merchants, and ordinary merchants.</p>
                  </div>
                  <DetailImagePair leftSrc={detailStrategy1a} rightSrc={detailStrategy1b} />
                  <div className="flex flex-col gap-3">
                    <p className={TEXT_LABEL}>Enhance entry efficiency, expand store entry traffic:</p>
                    <p className={BODY_PRIMARY}>Optimize some store entrances with high traffic and high conversion rates.</p>
                  </div>
                  <DetailImagePair leftSrc={detailStrategy1c} rightSrc={detailStrategy1d} />
                  <div className="flex flex-col gap-3">
                    <p className={TEXT_LABEL}>Enhance entry efficiency, expand store entry traffic:</p>
                    <p className={BODY_PRIMARY}>Optimize some store entrances with high traffic and high conversion rates.</p>
                  </div>
                  <DetailImagePair leftSrc={detailStrategy1e} rightSrc={detailStrategy1f} />
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <h3 className={TEXT_SUBTITLE}>Strategy 2: The store undertakes efficiency optimization and trust perception enhancement.</h3>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <p className={TEXT_LABEL}>Store framework structure reconstruction:</p>
                    <p className={BODY_PRIMARY}>Adjust the overall store framework structure, reasonably divide store functions.</p>
                  </div>
                  <DetailImageBlock src={detailStrategy2a} wrapperClassName="relative w-full overflow-hidden" />
                  <div className="flex flex-col gap-3">
                    <p className={TEXT_LABEL}>Enhance entry efficiency, expand store entry traffic:</p>
                    <p className={BODY_PRIMARY}>Optimize some store entrances with high traffic and high conversion rates.</p>
                  </div>
                  <DetailImageBlock src={detailStrategy2b} wrapperClassName="relative w-full overflow-hidden" />
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <h3 className={TEXT_SUBTITLE}>Strategy 3: Exploration of the value of store decoration</h3>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <p className={TEXT_LABEL}>Store framework structure reconstruction:</p>
                    <p className={BODY_PRIMARY}>Adjust the overall store framework structure, build a flexible, scalable store framework.</p>
                  </div>
                  <DetailImageBlock src={detailStrategy3a} wrapperClassName="relative w-full overflow-hidden" />
                  <div className="flex flex-col gap-3">
                    <p className={TEXT_LABEL}>Enhance entry efficiency, expand store entry traffic:</p>
                    <p className={BODY_PRIMARY}>Optimize some store entrances with high traffic and high conversion rates.</p>
                  </div>
                  <DetailImageBlock src={detailStrategy3b} wrapperClassName="relative w-full overflow-hidden" />
                </div>
              </div>
            </div>
              </div>
            </div>
          </section>
          <DetailSection title="Implement rhythm">
            <div className="flex flex-col gap-6">
              {IMPLEMENT_RHYTHM_BLOCKS.map((block) => (
                <DetailTextBlock key={block.title} title={block.title} description={block.description} />
              ))}
            </div>
          </DetailSection>
          <DetailSection title="Appendix">
            <ol className="detail-list list-decimal space-y-3 text-left text-base leading-relaxed text-black/80">
              <li>design link</li>
              <li>design link</li>
              <li>design link</li>
            </ol>
          </DetailSection>
            </>
          )}
        </div>
        <footer className="flex w-full items-center justify-center border-t border-black px-10 py-16">
          <p className="font-playfair text-center text-2xl font-bold italic leading-[1.2]">
            I don&apos;t need a Thought Stamp—I am the master of my own convictions.
          </p>
        </footer>
      </main>
  );
}
