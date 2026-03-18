/**
 * 首页内容 - 基于 Figma 设计稿 (node-id=208-70011)
 * Hero 图片走 basePath，兼容 GitHub Pages / Gitee / Vercel 等多环境。
 */

const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const heroImg = { src: `${BASE_PATH}/hero-watercolor.png` } as const;
import projectPlaceholder from "@/assets/placeholder-project.jpg";
import thinkingPlaceholder from "@/assets/placeholder-thinking.jpg";
import thinkingImg1 from "@/assets/thinking/thinking-7f12ea1300756f144a0fb5daaf68dbfc01103a46.png";
import thinkingImg2 from "@/assets/thinking/thinking-2a85d4c6629fe190763e2c6aba62ff22e65fcbf1.png";
import thinkingImg3 from "@/assets/thinking/thinking-c2c8871fb352004eedca2b15978708e9f32e4026.png";
import thinkingImg4 from "@/assets/thinking/thinking-6df743fc239d2db76126f65cd074f9618d56f5cd.png";
import thinkingImg5 from "@/assets/thinking/thinking-0d3a0ea1b442a139bfcc3fd041d34d03a84627a5.png";
import thinkingImg6 from "@/assets/thinking/thinking-a3129a53e4026333677575944aa4c6187eb2c94a.png";
import thinkingImg7 from "@/assets/thinking/thinking-95e962aad3f70bfa82a22777cdf7e78f783e53e0.png";
import keyProject1 from "@/assets/key-project-1.png";
import keyProject2 from "@/assets/key-project-2.png";
import keyProject3 from "@/assets/key-project-3.png";
import keyProject4 from "@/assets/key-project-4.png";
import { HeroBackground } from "@/components/HeroBackground";
import { HeroQuote } from "@/components/HeroQuote";
import { LinkToDetail } from "@/components/LinkToDetail";
import { PortfolioShell } from "@/components/PortfolioShell";
import { ProjectCard } from "@/components/ProjectCard";
import { ThinkingCard } from "@/components/ThinkingCard";
import { BODY_PRIMARY, TEXT_SECTION_TITLE, TEXT_STAT_LABEL, TEXT_STAT_NUMBER } from "@/lib/typography";

const PLACEHOLDER = {
  hero: heroImg as { src: string },
  project: projectPlaceholder as { src: string },
  thinking: thinkingPlaceholder as { src: string },
};

const THINKING_CARDS: {
  title: string;
  imageSrcs: string[];
  gradientFrom: string;
  blurb: string;
}[] = [
  {
    title: "Store experience insights",
    imageSrcs: [(thinkingImg1 as { src: string }).src, (thinkingImg2 as { src: string }).src],
    gradientFrom: "29.625%",
    blurb: "Synthesizing behavioral data and qualitative research to refine browse-to-buy flows and shelf-level clarity.",
  },
  {
    title: "Entry & conversion design",
    imageSrcs: [(thinkingImg1 as { src: string }).src, (thinkingImg3 as { src: string }).src],
    gradientFrom: "29.625%",
    blurb: "Reducing friction from first touch to intent—landing structure, CTAs, and progressive disclosure tuned for conversion.",
  },
  {
    title: "Merchant trust & grading",
    imageSrcs: [(thinkingImg4 as { src: string }).src],
    gradientFrom: "37.403%",
    blurb: "Signals and transparency that help buyers trust sellers while keeping grading fair and actionable for operators.",
  },
  {
    title: "Traffic and discovery",
    imageSrcs: [(thinkingImg1 as { src: string }).src, (thinkingImg2 as { src: string }).src, (thinkingImg5 as { src: string }).src],
    gradientFrom: "29.625%",
    blurb: "Connecting discovery surfaces with store identity so the right shops surface without noisy or duplicate exposure.",
  },
  {
    title: "Landing page optimization",
    imageSrcs: [(thinkingImg1 as { src: string }).src, (thinkingImg3 as { src: string }).src, (thinkingImg6 as { src: string }).src],
    gradientFrom: "29.625%",
    blurb: "Iterating hero, proof, and hierarchy so campaign landings match user intent and measurable funnel outcomes.",
  },
  {
    title: "Inventory management system upgrade",
    imageSrcs: [(thinkingImg1 as { src: string }).src, (thinkingImg6 as { src: string }).src, (thinkingImg7 as { src: string }).src],
    gradientFrom: "29.625%",
    blurb: "Operational dashboards and alerts that scale with catalog complexity—accuracy first, then speed for merchants.",
  },
];

export function HomeMain() {
  return (
    <main className="min-w-0 flex-1">
        {/* Hero：宽高比 2:1；与 hero image 同区域，左右各 160px padding，句子在中间撑满展示，两行放不下则缩小字号 */}
        <section
          className="relative flex w-full shrink-0 items-center justify-center overflow-hidden py-8 px-[120px] max-md:px-8"
          style={{ aspectRatio: "2" }}
        >
          <div className="absolute inset-0 pointer-events-none hero-bg-animated" aria-hidden>
            <HeroBackground src={PLACEHOLDER.hero.src} />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative z-10 mx-auto flex w-full flex-col items-center gap-2 px-4 text-center text-white hero-content-animated">
            <HeroQuote
              text="Weakness and ignorance are not the barriers to survival, but arrogance is."
              className="hero-quote w-full font-bold leading-snug text-[clamp(20px,3.6vw,64px)]"
            />
          </div>
        </section>

        {/* KEY PROJECTS */}
        <section id="projects" className="border-b border-black">
          <div className="flex items-center justify-start px-[var(--section-px)] pb-[var(--section-block-pb)] pt-[var(--section-title-pt)]">
            <h2 className={`${TEXT_SECTION_TITLE} text-left`}>
              KEY PROJECTS
            </h2>
          </div>
          <div className="flex flex-col gap-10 px-[var(--section-px)] pb-[var(--section-block-pb)] pt-5">
            <div className="grid gap-10 md:grid-cols-2">
              <LinkToDetail href="/detail?title=Shop%20framework%20revamp&from=projects" className="flex min-h-0 flex-1 no-underline text-inherit">
                <ProjectCard
                  imageSrc={(keyProject1 as { src: string }).src}
                  title="Shop framework revamp"
                  description="As a domain for capturing public traffic, retaining user assets, and driving private domain conversion, the store is evolving from platform-driven operations to a co-managed model with merchants. However, the current store framework no longer meets the demands of rapid business growth. Therefore, a more efficient, flexible, and trustworthy framework is essential to support the next phase of development."
                />
              </LinkToDetail>
              <LinkToDetail href="/detail?title=Shop%20decoration%20solutions&from=projects" className="flex min-h-0 flex-1 no-underline text-inherit">
                <ProjectCard
                  imageSrc={(keyProject2 as { src: string }).src}
                  title="Shop decoration solutions"
                  description="To elevate customer satisfaction and engagement, we are focusing on optimizing the user journey. This involves refining navigation, improving load times, and personalizing content. By leveraging user feedback and analytics, we aim to create a seamless and intuitive shopping experience that caters to individual preferences."
                />
              </LinkToDetail>
            </div>
            <div className="grid gap-10 md:grid-cols-2">
              <LinkToDetail href="/detail?title=Shop%20tiering%20system&from=projects" className="flex min-h-0 flex-1 no-underline text-inherit">
                <ProjectCard
                  imageSrc={(keyProject3 as { src: string }).src}
                  title="Shop tiering system"
                  description="A tiered shop model maps merchant maturity to differentiated tools, exposure, and trust signals—so platform investment aligns with growth stage and sellers always know what to aim for next."
                />
              </LinkToDetail>
              <LinkToDetail href="/detail?title=Campaign%20for%20shop&from=projects" className="flex min-h-0 flex-1 no-underline text-inherit">
                <ProjectCard
                  imageSrc={(keyProject4 as { src: string }).src}
                  title="Campaign for shop"
                  description="End-to-end design for shop-facing campaigns: enrollment, assets, and in-store surfacing—balancing low friction for merchants with clear lift in traffic, participation, and conversion."
                />
              </LinkToDetail>
            </div>
          </div>
        </section>

        {/* DESIGN THINKING */}
        <section id="thinking" className="border-b border-black">
          <div className="flex items-center justify-start px-[var(--section-px)] pb-[var(--section-block-pb)] pt-16">
            <h2 className={`${TEXT_SECTION_TITLE} text-left`}>
              DESIGN THINKING
            </h2>
          </div>
          <div className="grid gap-10 px-[var(--section-px)] pb-16 pt-5 md:grid-cols-2 lg:grid-cols-3">
            {THINKING_CARDS.map((card, key) => (
              <LinkToDetail key={key} href={`/detail?title=${encodeURIComponent(card.title)}&from=thinking`} className="block no-underline text-inherit">
                <ThinkingCard
                  title={card.title}
                  imageSrcs={card.imageSrcs}
                  gradientFrom={card.gradientFrom}
                  blurb={card.blurb}
                />
              </LinkToDetail>
            ))}
          </div>
        </section>

        {/* ABOUT ME */}
        <section id="about" className="border-b border-black">
          <div className="flex items-center justify-start px-[var(--section-px)] pb-[var(--section-block-pb)] pt-[var(--section-title-pt)]">
            <h2 className={`${TEXT_SECTION_TITLE} text-left`}>
              ABOUT ME
            </h2>
          </div>
          <div className="flex flex-col px-[var(--section-px)] pb-10 pt-5 md:pb-12 lg:pb-[60px]">
            <div className="bg-[#f5f5f5] p-4 md:p-6 lg:p-10 xl:p-[60px]">
              <div className="flex w-full flex-col gap-10 md:gap-12 lg:gap-[48px] xl:gap-[60px] lg:max-w-none">
                {/* 简介 + 数据：Figma 同一块，仅一条底边 */}
                <div className="flex flex-col gap-10 border-b border-black pb-[48px] md:pb-[60px]">
                  <div className="flex flex-col gap-4 md:gap-5">
                    <p className="max-w-[14ch] text-3xl font-bold leading-[1.25] sm:text-4xl md:text-5xl lg:text-[56px]">
                      Hey, I&apos;m Jun Dong.
                    </p>
                    <p className="max-w-[18ch] text-2xl font-medium leading-[1.25] sm:text-3xl md:text-[32px]">
                      Nice to meet you!
                    </p>
                  </div>
                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <StatBlock number="8" label="Years" detail="I have 8 years of UX design experience across consumer and enterprise products." />
                    <StatBlock number="3" label="Companies" detail="I have worked at 3 large internet companies in China." />
                    <StatBlock number="12+" label="Projects" detail="I have led over 12 key design projects from 0 to 1 or major upgrades." />
                  </div>
                </div>

                {/* 经历：一块一条底边，无左侧竖线 */}
                <div className="flex flex-col gap-10 border-b border-black pb-[60px] md:gap-10">
                  <div className="flex gap-6 md:gap-8">
                    <div className="flex min-w-0 flex-1 flex-col pl-0">
                      <div className="flex flex-wrap items-baseline gap-10 text-2xl font-bold">
                        <span className="font-semibold tabular-nums text-black/60">2021.05 - 2035.05</span>
                        <span>TikTok</span>
                        <span className="font-semibold text-black/90">SENIOR UX DESIGNER</span>
                      </div>
                      <p className="mt-3 text-base leading-[1.3] text-black/70 md:mt-4">
                        As the point of contact for the store and showcase domain, I spearheaded initiatives to enhance entrance traffic, optimize landing page conversion rates, and foster promotion and seller trust. I successfully elevated brand awareness through strategic projects, including a comprehensive revamp of the store&apos;s default homepage.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6 md:gap-8">
                    <div className="flex min-w-0 flex-1 flex-col pl-0">
                      <div className="flex flex-wrap items-baseline gap-10 text-2xl font-bold">
                        <span className="font-semibold tabular-nums text-black/60">2019.04 - 2021.01</span>
                        <span>LIGHTINTHEBOX</span>
                        <span className="font-semibold text-black/90">UX DESIGNER</span>
                      </div>
                      <p className="mt-3 text-base leading-[1.3] text-black/70 md:mt-4">
                        Accountable for the specialized visual and interactive design of the ezbuy and LITB shopping platforms, focusing on the iterative enhancements of the homepage, shopping cart interface, login and registration pages, as well as daily operational functionalities.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6 md:gap-8">
                    <div className="flex min-w-0 flex-1 flex-col pl-0">
                      <div className="flex flex-wrap items-baseline gap-10 text-2xl font-bold">
                        <span className="font-semibold tabular-nums text-black/60">2018.07 - 2019.01</span>
                        <span>IQIYI</span>
                        <span className="font-semibold text-black/90">UI DESIGNER</span>
                      </div>
                      <p className="mt-3 text-base leading-[1.3] text-black/70 md:mt-4">
                        Facilitate the daily iteration needs of the TVGO APP, ensuring thorough visual inspections and acceptance criteria are met for each version.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 联系方式：在小屏上拆行，大屏保持一行 */}
                <div className="flex flex-col flex-wrap gap-4 text-lg font-bold sm:flex-row sm:items-center sm:gap-8 md:text-2xl">
                  <span className="whitespace-nowrap">
                    <span className="text-black/50">WeChat</span>{" "}
                    <span className="break-all">dongjun 239212</span>
                  </span>
                  <span className="whitespace-nowrap">
                    <span className="text-black/50">Mobile</span>{" "}
                    <span className="break-all">+86 150 7169 7874</span>
                  </span>
                  <span className="whitespace-normal break-all">
                    <span className="text-black/50">Email</span>{" "}
                    <span className="break-all">dongjun239212@gmail.com</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex items-center justify-center px-[var(--section-px)] py-16">
          <p className="font-playfair text-center text-2xl font-bold italic leading-[1.2]">
            I don&apos;t need a Thought Stamp—I am the master of my own convictions.
          </p>
        </footer>
      </main>
  );
}

export default function HomePage() {
  return (
    <PortfolioShell isDetail={false} detailFromSection={null}>
      <HomeMain />
    </PortfolioShell>
  );
}

function StatBlock({
  number,
  label,
  detail,
}: {
  number: string;
  label: string;
  detail: string;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-baseline gap-2.5">
        <span className={TEXT_STAT_NUMBER}>
          {number}
        </span>
        <span className={TEXT_STAT_LABEL}>{label}</span>
      </div>
      <p className={`max-w-[34ch] ${BODY_PRIMARY}`}>
        {detail}
      </p>
    </div>
  );
}
