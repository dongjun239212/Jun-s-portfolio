/**
 * 项目详情页内容 - 供视图切换复用
 */

import Link from "next/link";
import { Suspense } from "react";
import { DetailImage } from "@/components/DetailImage";
import { DetailTitleSection } from "@/components/DetailTitleSection";
import { SidebarNav } from "@/components/SidebarNav";
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

type DetailPageContentProps = { detailFromSection?: string | null };

export function DetailPageContent({ detailFromSection = null }: DetailPageContentProps) {
  return (
    <div className="flex min-h-screen bg-white text-black">
      <aside className="sticky top-0 flex h-screen w-[220px] shrink-0 flex-col border-r border-black">
        <div className="flex flex-col border-b border-black px-5 py-10">
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
        </div>
        <SidebarNav basePath="/" activeSection={detailFromSection} />
      </aside>

      <main className="min-w-0 flex-1 flex flex-col w-full">
        <section className="relative h-[480px] w-full shrink-0 overflow-hidden" aria-hidden>
          <DetailImage src={detailHero} alt="" className="object-cover object-center size-full" fill priority />
        </section>
        <div className="flex w-full max-w-[1680px] flex-1 flex-col mx-auto pb-[120px]">
          <Suspense fallback={<section className="flex flex-col bg-white px-5 pt-[60px] pb-[40px] md:px-[60px]"><div className="h-20 w-64 bg-black/5 rounded animate-pulse" /></section>}>
            <DetailTitleSection />
          </Suspense>
          <section className="flex flex-col gap-[20px] px-5 py-[40px] md:px-[60px]">
            <h2 className="flex items-baseline text-[32px] font-bold leading-[1.2] text-black"><span className="min-w-0 shrink-[8] tabular-nums text-black/65 mr-3">1.</span><span className="">Background</span></h2>
            <p className="text-base leading-[1.3] text-black/65">
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
          </section>
          <section className="flex flex-col gap-[20px] px-5 py-[40px] md:px-[60px]">
            <h2 className="flex items-baseline text-[32px] font-bold leading-[1.2] text-black"><span className="min-w-0 shrink-[8] tabular-nums text-black/65 mr-3">2.</span><span className="">Goals</span></h2>
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[10px]">
                <h3 className="text-[24px] font-bold leading-[1.2] text-black">Business goals</h3>
                <p className="text-base leading-[1.3] text-black/65">
                  Through the end-to-end experience upgrade of the store, strengthening entry
                  perception and improving service efficiency, we can achieve precise matching between
                  traffic intent and service scenarios, ultimately driving long-term and large-scale
                  growth of GMV for key merchants.
                </p>
              </div>
              <div className="flex flex-col gap-[10px]">
                <h3 className="text-[24px] font-bold leading-[1.2] text-black">Design goals</h3>
                <p className="text-base leading-[1.3] text-black/65">
                  Through experience optimization from the store entrance to the store&apos;s service
                  delivery and exploration of design opportunity points, we help upgrade the
                  store&apos;s business model, ultimately achieving the win-win goal of business GMV
                  growth and user experience optimization.
                </p>
              </div>
              <div className="flex flex-col gap-[10px]">
                <h3 className="text-[24px] font-bold leading-[1.2] text-black">Success metrics</h3>
                <p className="text-base leading-[1.3] text-black/65">
                  Store GMV +X%, Store CO & IPO +X%, store NPSr (brand perception/aesthetics) +X%.
                </p>
              </div>
            </div>
          </section>
          <section className="flex flex-col gap-[40px] px-5 py-[40px] md:px-[60px] text-left">
            <div className="flex flex-col items-start gap-[20px]">
              <h2 className="flex items-baseline text-[32px] font-bold leading-[1.2] text-black"><span className="min-w-0 shrink-[8] tabular-nums text-black/65 mr-3">3.</span><span className="">Design analysis</span></h2>
              <p className="text-base leading-[1.3] text-black/65">
                We conduct systematic analysis and summary from three dimensions: User Research
                reports, User Data Analysis, and analysis of non-China DTC competing products. While
                extracting core highlights, we also sort out and form theoretical research basis to
                support the subsequent iteration of the product.
              </p>
            </div>
            <div className="flex flex-col items-start gap-[40px]">
              <div className="flex w-full flex-col items-start gap-[20px]">
                <h3 className="text-[24px] font-bold leading-[1.2] text-black">User research perspective</h3>
                <div className="flex w-full flex-col items-start gap-[10px] text-left">
                  <p className="text-base font-semibold leading-[1.3] text-black">Insights</p>
                  <ol className="detail-list list-decimal space-y-[10px] text-left text-base leading-[1.3] text-black/65">
                    <li>The FYP scenario remains one of the most valuable channels for attracting customers into stores, and how to enhance store perception in content scenarios is worth exploring.</li>
                    <li>The store grading logic should be as clear and simple as possible, and should not blindly copy the Chinese grading system.</li>
                    <li>The brand/basic perception and structure of the store should be as closely aligned with the DTC website as possible to reduce users&apos; understanding costs.</li>
                  </ol>
                </div>
                <div className="relative w-full overflow-hidden rounded-none" style={{ aspectRatio: "540/300" }} aria-hidden>
                  <DetailImage src={detailUserResearch} alt="" className="object-cover object-center" fill />
                </div>
              </div>
              <div className="flex w-full flex-col items-start gap-[20px]">
                <h3 className="text-[24px] font-bold leading-[1.2] text-black">Data performance perspective</h3>
                <div className="flex w-full flex-col items-start gap-[20px]">
                  <div className="flex w-full flex-col items-start gap-[10px] text-left">
                    <p className="text-base font-semibold leading-[1.3] text-black">Insights- entrance</p>
                    <ol className="detail-list list-decimal space-y-[10px] text-left text-base leading-[1.3] text-black/65">
                      <li>The store entrance with high conversion and high exposure should provide more refined trust information and value points to attract users to enter the store.</li>
                      <li>Post-purchase scenarios should provide more follow-up mental information, such as adding store updates to frequently shopped stores in the order list.</li>
                      <li>The content and recommendation fields have high conversion efficiency, can expand more store entry forms, and increase in-store traffic.</li>
                    </ol>
                  </div>
                  <div className="flex w-full flex-col items-start gap-[10px] text-left">
                    <p className="text-base font-semibold leading-[1.3] text-black">Insights- landing page</p>
                    <ol className="detail-list list-decimal space-y-[10px] text-left text-base leading-[1.3] text-black/65">
                      <li>Strengthen in-store product search capabilities, increase the weight of in-store search and classification entry points, streamline classification levels, and enable stores with a large number of products to be &quot;more enjoyable to browse and quicker to find products&quot;.</li>
                      <li>The distinction between branded and non-branded stores has increased, and users place different emphases on trust in branded and non-branded stores. Therefore, greater differentiation should be made in information presentation.</li>
                      <li>Strengthen the penetration of marketing promotion information. The default decoration components should include marketing components such as flash sales, BMSM, etc.</li>
                      <li>Provide returning customers with a shorter path back to the store, offer quick follow-up entry points and associated recommendations based on historical behavior.</li>
                    </ol>
                  </div>
                </div>
                <div className="flex w-full gap-[20px]">
                  <div className="relative min-h-[200px] min-w-0 flex-1 shrink-0 overflow-hidden" style={{ aspectRatio: "540/300" }} aria-hidden>
                    <DetailImage src={detailData1} alt="" className="object-cover object-center" fill />
                  </div>
                  <div className="relative min-h-[200px] min-w-0 flex-1 shrink-0 overflow-hidden" style={{ aspectRatio: "540/300" }} aria-hidden>
                    <DetailImage src={detailData2} alt="" className="object-cover object-center" fill />
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col items-start gap-[20px]">
                <h3 className="text-[24px] font-bold leading-[1.2] text-black">Competitor perspective</h3>
                <div className="flex w-full flex-col items-start gap-[10px] text-left">
                  <p className="text-base font-semibold leading-[1.3] text-black">Insights- entrance</p>
                  <ol className="detail-list list-decimal space-y-[10px] text-left text-base leading-[1.3] text-black/65">
                    <li>As a platform-based product, TTS can refer more to the framework of platform-based products in terms of large-scale structure and functional division.</li>
                    <li>The display of trust-related information is particularly important. Brand stores need to showcase not only products but also brand propositions, stories, and styles.</li>
                    <li>For stores with renovation capabilities, TTS&apos;s renovation needs to break away from the existing templates and provide more flexible and configurable renovation structures.</li>
                    <li>For users at different stages and with different intentions when entering the store, more accurate and refined service capabilities need to be provided.</li>
                  </ol>
                </div>
                <div className="flex w-full flex-col gap-[20px]">
                  <div className="relative min-h-[200px] w-full shrink-0 overflow-hidden" style={{ aspectRatio: "540/300" }} aria-hidden>
                    <DetailImage src={detailCompetitor1} alt="" className="object-cover object-center" fill />
                  </div>
                  <div className="relative min-h-[200px] w-full shrink-0 overflow-hidden" style={{ aspectRatio: "540/300" }} aria-hidden>
                    <DetailImage src={detailCompetitor2} alt="" className="object-cover object-center" fill />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col gap-[40px] px-5 py-[40px] md:px-[60px]">
            <div className="flex flex-col gap-[20px]">
              <h2 className="flex items-baseline text-[32px] font-bold leading-[1.2] text-black"><span className="min-w-0 shrink-[8] tabular-nums text-black/65 mr-3">4.</span><span className="">Design Strategies</span></h2>
              <p className="text-base leading-[1.3] text-black/65">
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
            <div className="flex flex-col gap-[40px]">
              <div className="flex flex-col gap-[20px]">
                <h3 className="text-[24px] font-bold leading-[1.2] text-black">Strategy 1: Optimization of the current store entrance and expansion of more store entrances</h3>
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-base font-semibold leading-[1.3] text-black">Build a systematic and comprehensive store grading system:</p>
                    <p className="text-base leading-[1.3] text-black/65">Based on the latest strategic decisions, make systematic distinctions among brands, distributors, large DTC merchants, and ordinary merchants. Meanwhile, establish the representation of merchants with different identity systems in the overall E2E link, especially in the post-purchase link.</p>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-base font-semibold leading-[1.3] text-black">Enhance entry efficiency, expand store entry traffic:</p>
                    <p className="text-base leading-[1.3] text-black/65">Optimize some store entrances with high traffic and high conversion rates, strengthen recall and repurchase, and improve store entry efficiency. Discover more valuable store entrances to further expand store entry traffic.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                <h3 className="text-[24px] font-bold leading-[1.2] text-black">Strategy 2: The store undertakes efficiency optimization and trust perception enhancement.</h3>
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-base font-semibold leading-[1.3] text-black">Store framework structure reconstruction:</p>
                    <p className="text-base leading-[1.3] text-black/65">Adjust the overall store framework structure, reasonably divide store functions based on different functional characteristics, build a flexible, scalable, and reliable store framework to meet users&apos; diverse shopping intentions.</p>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-base font-semibold leading-[1.3] text-black">Enhance entry efficiency, expand store entry traffic:</p>
                    <p className="text-base leading-[1.3] text-black/65">Optimize some store entrances with high traffic and high conversion rates, strengthen recall and repurchase, and improve store entry efficiency.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                <h3 className="text-[24px] font-bold leading-[1.2] text-black">Strategy 3: Exploration of the value of store decoration</h3>
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-base font-semibold leading-[1.3] text-black">Store framework structure reconstruction:</p>
                    <p className="text-base leading-[1.3] text-black/65">Adjust the overall store framework structure, reasonably divide store functions based on different functional characteristics, build a flexible, scalable, and reliable store framework.</p>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-base font-semibold leading-[1.3] text-black">Enhance entry efficiency, expand store entry traffic:</p>
                    <p className="text-base leading-[1.3] text-black/65">Optimize some store entrances with high traffic and high conversion rates, strengthen recall and repurchase, and improve store entry efficiency.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col gap-[40px] px-5 py-[40px] md:px-[60px]">
            <h2 className="flex items-baseline text-[32px] font-bold leading-[1.2] text-black"><span className="min-w-0 shrink-[8] tabular-nums text-black/65 mr-3">5.</span><span className="">Design proposal</span></h2>
            <div className="relative w-full overflow-hidden rounded-none" style={{ aspectRatio: "540/300" }} aria-hidden>
              <DetailImage src={detailProposalMain} alt="" className="object-cover object-center" fill />
            </div>
            <div className="flex flex-col gap-[40px]">
              <div className="flex flex-col gap-[20px]">
                <h3 className="text-[24px] font-bold leading-[1.2] text-black">Strategy 1: Optimization of the current store entrance and expansion of more store entrances</h3>
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-base font-semibold leading-[1.3] text-black">Build a systematic and comprehensive store grading system:</p>
                    <p className="text-base leading-[1.3] text-black/65">Based on the latest strategic decisions, make systematic distinctions among brands, distributors, large DTC merchants, and ordinary merchants.</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <div className="relative min-w-0 flex-1 overflow-hidden" style={{ aspectRatio: "540/300" }} aria-hidden>
                      <DetailImage src={detailStrategy1a} alt="" className="object-cover object-center" fill />
                    </div>
                    <div className="relative min-w-0 flex-1 overflow-hidden" style={{ aspectRatio: "540/300" }} aria-hidden>
                      <DetailImage src={detailStrategy1b} alt="" className="object-cover object-center" fill />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-base font-semibold leading-[1.3] text-black">Enhance entry efficiency, expand store entry traffic:</p>
                    <p className="text-base leading-[1.3] text-black/65">Optimize some store entrances with high traffic and high conversion rates.</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <div className="relative min-w-0 flex-1 overflow-hidden" style={{ aspectRatio: "540/300" }} aria-hidden>
                      <DetailImage src={detailStrategy1c} alt="" className="object-cover object-center" fill />
                    </div>
                    <div className="relative min-w-0 flex-1 overflow-hidden" style={{ aspectRatio: "540/300" }} aria-hidden>
                      <DetailImage src={detailStrategy1d} alt="" className="object-cover object-center" fill />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-base font-semibold leading-[1.3] text-black">Enhance entry efficiency, expand store entry traffic:</p>
                    <p className="text-base leading-[1.3] text-black/65">Optimize some store entrances with high traffic and high conversion rates.</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <div className="relative min-w-0 flex-1 overflow-hidden" style={{ aspectRatio: "540/300" }} aria-hidden>
                      <DetailImage src={detailStrategy1e} alt="" className="object-cover object-center" fill />
                    </div>
                    <div className="relative min-w-0 flex-1 overflow-hidden" style={{ aspectRatio: "540/300" }} aria-hidden>
                      <DetailImage src={detailStrategy1f} alt="" className="object-cover object-center" fill />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                <h3 className="text-[24px] font-bold leading-[1.2] text-black">Strategy 2: The store undertakes efficiency optimization and trust perception enhancement.</h3>
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-base font-semibold leading-[1.3] text-black">Store framework structure reconstruction:</p>
                    <p className="text-base leading-[1.3] text-black/65">Adjust the overall store framework structure, reasonably divide store functions.</p>
                  </div>
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "540/300" }} aria-hidden>
                    <DetailImage src={detailStrategy2a} alt="" className="object-cover object-center" fill />
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-base font-semibold leading-[1.3] text-black">Enhance entry efficiency, expand store entry traffic:</p>
                    <p className="text-base leading-[1.3] text-black/65">Optimize some store entrances with high traffic and high conversion rates.</p>
                  </div>
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "540/300" }} aria-hidden>
                    <DetailImage src={detailStrategy2b} alt="" className="object-cover object-center" fill />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                <h3 className="text-[24px] font-bold leading-[1.2] text-black">Strategy 3: Exploration of the value of store decoration</h3>
                <div className="flex flex-col gap-[20px]">
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-base font-semibold leading-[1.3] text-black">Store framework structure reconstruction:</p>
                    <p className="text-base leading-[1.3] text-black/65">Adjust the overall store framework structure, build a flexible, scalable store framework.</p>
                  </div>
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "540/300" }} aria-hidden>
                    <DetailImage src={detailStrategy3a} alt="" className="object-cover object-center" fill />
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-base font-semibold leading-[1.3] text-black">Enhance entry efficiency, expand store entry traffic:</p>
                    <p className="text-base leading-[1.3] text-black/65">Optimize some store entrances with high traffic and high conversion rates.</p>
                  </div>
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "540/300" }} aria-hidden>
                    <DetailImage src={detailStrategy3b} alt="" className="object-cover object-center" fill />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col gap-[20px] px-5 py-[40px] md:px-[60px]">
            <h2 className="flex items-baseline text-[32px] font-bold leading-[1.2] text-black"><span className="min-w-0 shrink-[8] tabular-nums text-black/65 mr-3">6.</span><span className="">Implement rhythm</span></h2>
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[10px]">
                <h3 className="text-[24px] font-bold leading-[1.2] text-black">Business goals</h3>
                <p className="text-base leading-[1.3] text-black/65">Through the end-to-end experience upgrade of the store, strengthening entry perception and improving service efficiency, we can achieve precise matching between traffic intent and service scenarios.</p>
              </div>
              <div className="flex flex-col gap-[10px]">
                <h3 className="text-[24px] font-bold leading-[1.2] text-black">Design goals</h3>
                <p className="text-base leading-[1.3] text-black/65">Through experience optimization from the store entrance to the store&apos;s service delivery, we help upgrade the store&apos;s business model.</p>
              </div>
              <div className="flex flex-col gap-[10px]">
                <h3 className="text-[24px] font-bold leading-[1.2] text-black">Success metrics</h3>
                <p className="text-base leading-[1.3] text-black/65">Store GMV +X%, Store CO & IPO +X%, store NPSr (brand perception/aesthetics) +X%.</p>
              </div>
            </div>
          </section>
          <section className="flex flex-col gap-[20px] px-5 py-[40px] md:px-[60px]">
            <h2 className="flex items-baseline text-[32px] font-bold leading-[1.2] text-black"><span className="min-w-0 shrink-[8] tabular-nums text-black/65 mr-3">7.</span><span className="">Appendix</span></h2>
            <ol className="detail-list list-decimal space-y-[10px] text-left text-base leading-[1.3] text-black/65">
              <li>design link</li>
              <li>design link</li>
              <li>design link</li>
            </ol>
          </section>
        </div>
        <footer className="flex w-full items-center justify-center border-t border-black px-10 py-16">
          <p className="font-playfair text-center text-2xl font-bold italic leading-[1.2]">
            I don&apos;t need a Thought Stamp—I am the master of my own convictions.
          </p>
        </footer>
      </main>
    </div>
  );
}
