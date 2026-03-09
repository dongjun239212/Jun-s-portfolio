/**
 * 首页内容 - 基于 Figma 设计稿 (node-id=208-70011)
 * 图片通过 import 引入，使用原生 img 确保稳定显示
 */

import heroImg from "@/assets/hero-bg.png";
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
import { LinkToDetail } from "@/components/LinkToDetail";
import { ProjectCard } from "@/components/ProjectCard";
import { SidebarNav } from "@/components/SidebarNav";
import { ThinkingCard } from "@/components/ThinkingCard";

const PLACEHOLDER = {
  hero: heroImg as { src: string },
  project: projectPlaceholder as { src: string },
  thinking: thinkingPlaceholder as { src: string },
};

const THINKING_CARDS: { title: string; imageSrcs: string[]; gradientFrom: string }[] = [
  { title: "Store experience insights", imageSrcs: [(thinkingImg1 as { src: string }).src, (thinkingImg2 as { src: string }).src], gradientFrom: "29.625%" },
  { title: "Entry & conversion design", imageSrcs: [(thinkingImg1 as { src: string }).src, (thinkingImg3 as { src: string }).src], gradientFrom: "29.625%" },
  { title: "Merchant trust & grading", imageSrcs: [(thinkingImg4 as { src: string }).src], gradientFrom: "37.403%" },
  { title: "Traffic and discovery", imageSrcs: [(thinkingImg1 as { src: string }).src, (thinkingImg2 as { src: string }).src, (thinkingImg5 as { src: string }).src], gradientFrom: "29.625%" },
  { title: "Landing page optimization", imageSrcs: [(thinkingImg1 as { src: string }).src, (thinkingImg3 as { src: string }).src, (thinkingImg6 as { src: string }).src], gradientFrom: "29.625%" },
  { title: "Inventory management system upgrade", imageSrcs: [(thinkingImg1 as { src: string }).src, (thinkingImg6 as { src: string }).src, (thinkingImg7 as { src: string }).src], gradientFrom: "29.625%" },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-white text-black" id="top">
      {/* 左侧导航 - 220px 固定 */}
      <aside className="sticky top-0 flex h-screen w-[220px] shrink-0 flex-col border-r border-black">
        <div className="flex flex-col border-b border-black px-5 py-10">
          <a href="#top" className="flex w-40 items-center justify-center p-2.5 cursor-pointer no-underline text-inherit hover:opacity-80 transition-opacity">
            <h1 className="whitespace-pre-wrap text-2xl font-bold leading-[1.2]">
              {`CALM `}
              {`& `}
              CRAZY
            </h1>
          </a>
        </div>
        <SidebarNav />
      </aside>

      <main className="min-w-0 flex-1">
        {/* Hero：宽高比 2:1；与 hero image 同区域，左右各 160px padding，句子在中间撑满展示，两行放不下则缩小字号 */}
        <section
          className="relative flex w-full shrink-0 items-center justify-center overflow-hidden py-8 px-[160px] max-md:px-8"
          style={{ aspectRatio: "2" }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <HeroBackground src={PLACEHOLDER.hero.src} />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <p className="font-hero-cn hero-text-gold relative z-10 w-full text-center text-[3.5rem] font-medium leading-[1.3] md:text-[4.5rem]">
            凡有所相，皆为虚妄。若见诸相非相，即见未来。
          </p>
        </section>

        {/* KEY PROJECTS */}
        <section id="projects" className="border-b border-black">
          <div className="flex items-center justify-start px-10 pb-10 pt-[60px]">
            <h2 className="text-4xl font-bold leading-[1.2] text-left">
              KEY PROJECTS
            </h2>
          </div>
          <div className="flex flex-col gap-10 px-10 pb-10 pt-5">
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
                  description="With the increasing complexity of stock management, implementing an upgraded inventory solution is critical. This new system will enhance tracking accuracy, automate replenishment processes, and provide real-time analytics. Ultimately, it will empower merchants to maintain optimal stock levels and reduce overhead costs."
                />
              </LinkToDetail>
              <LinkToDetail href="/detail?title=Campaign%20for%20shop&from=projects" className="flex min-h-0 flex-1 no-underline text-inherit">
                <ProjectCard
                  imageSrc={(keyProject4 as { src: string }).src}
                  title="Campaign for shop"
                  description="With the increasing complexity of stock management, implementing an upgraded inventory solution is critical. This new system will enhance tracking accuracy, automate replenishment processes, and provide real-time analytics. Ultimately, it will empower merchants to maintain optimal stock levels and reduce overhead costs."
                />
              </LinkToDetail>
            </div>
          </div>
        </section>

        {/* DESIGN THINKING */}
        <section id="thinking" className="border-b border-black">
          <div className="flex items-center justify-start px-10 pt-16 pb-10">
            <h2 className="text-4xl font-bold leading-[1.2] text-left">
              DESIGN THINKING
            </h2>
          </div>
          <div className="grid gap-10 px-10 pb-16 pt-5 md:grid-cols-2 lg:grid-cols-3">
            {THINKING_CARDS.map((card, key) => (
              <LinkToDetail key={key} href={`/detail?title=${encodeURIComponent(card.title)}&from=thinking`} className="block no-underline text-inherit">
                <ThinkingCard title={card.title} imageSrcs={card.imageSrcs} gradientFrom={card.gradientFrom} />
              </LinkToDetail>
            ))}
          </div>
        </section>

        {/* ABOUT ME */}
        <section id="about" className="border-b border-black">
          <div className="flex items-center justify-start px-10 pb-10 pt-[60px]">
            <h2 className="text-4xl font-bold leading-[1.2] text-left">
              ABOUT ME
            </h2>
          </div>
          <div className="flex flex-col px-10 pb-[60px] pt-5">
            <div className="bg-[#f5f5f5] p-10 md:p-[60px]">
              <div className="flex w-full flex-col gap-[60px]">
                {/* 简介 + 数据：Figma 同一块，仅一条底边 */}
                <div className="flex flex-col gap-10 border-b border-black pb-[60px]">
                  <div className="flex flex-col gap-5">
                    <p className="text-[64px] font-bold leading-[1.25]">
                      Hey, I&apos;m Jun Dong.
                    </p>
                    <p className="text-[48px] font-medium leading-[1.25]">
                      Nice to meet you!
                    </p>
                  </div>
                  <div className="grid gap-10 sm:grid-cols-3">
                    <StatBlock number="6" label="Years" detail="I have 6 years work experience for UX design" />
                    <StatBlock number="3" label="companys" detail="I have worked for 3 large different business IT companies" />
                    <StatBlock number="12+" label="Projects" detail="I have successfully handled over 12 P00 design projects" />
                  </div>
                </div>

                {/* 经历：一块一条底边，无左侧竖线 */}
                <div className="flex flex-col gap-10 border-b border-black pb-[60px] md:gap-10">
                  <div className="flex gap-6 md:gap-8">
                    <div className="flex min-w-0 flex-1 flex-col pl-0">
                      <div className="flex flex-wrap items-baseline gap-10 text-2xl font-bold">
                        <span className="font-semibold tabular-nums text-black/48">2021.05 - 2025.05</span>
                        <span>TikTok</span>
                        <span className="font-semibold text-black/90">SENIOR UX DESIGNER</span>
                      </div>
                      <p className="mt-3 text-base leading-[1.3] text-black/48 md:mt-4">
                        As the point of contact for the store and showcase domain, I spearheaded initiatives to enhance entrance traffic, optimize landing page conversion rates, and foster promotion and seller trust. I successfully elevated brand awareness through strategic projects, including a comprehensive revamp of the store&apos;s default homepage.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6 md:gap-8">
                    <div className="flex min-w-0 flex-1 flex-col pl-0">
                      <div className="flex flex-wrap items-baseline gap-10 text-2xl font-bold">
                        <span className="font-semibold tabular-nums text-black/48">2019.04 - 2021.01</span>
                        <span>LIGHTINTHEBOX</span>
                        <span className="font-semibold text-black/90">UX DESIGNER</span>
                      </div>
                      <p className="mt-3 text-base leading-[1.3] text-black/48 md:mt-4">
                        Accountable for the specialized visual and interactive design of the ezbuy and LITB shopping platforms, focusing on the iterative enhancements of the homepage, shopping cart interface, login and registration pages, as well as daily operational functionalities.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6 md:gap-8">
                    <div className="flex min-w-0 flex-1 flex-col pl-0">
                      <div className="flex flex-wrap items-baseline gap-10 text-2xl font-bold">
                        <span className="font-semibold tabular-nums text-black/48">2018.07 - 2019.01</span>
                        <span>IQIYI</span>
                        <span className="font-semibold text-black/90">UI DESIGNER</span>
                      </div>
                      <p className="mt-3 text-base leading-[1.3] text-black/48 md:mt-4">
                        Facilitate the daily iteration needs of the TVGO APP, ensuring thorough visual inspections and acceptance criteria are met for each version.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 联系方式：Figma gap-[40px] text-[24px] bold */}
                <div className="flex flex-wrap items-center gap-10 text-2xl font-bold">
                  <span><span className="text-black/50">WeChat</span> dongjun 239212</span>
                  <span><span className="text-black/50">Mobile</span> +86 150 7169 7874</span>
                  <span><span className="text-black/50">eMail</span> dongjun239212@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex items-center justify-center px-10 py-16">
          <p className="font-playfair text-center text-2xl font-bold italic leading-[1.2]">
            I don&apos;t need a Thought Stamp—I am the master of my own convictions.
          </p>
        </footer>
      </main>
    </div>
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
        <span className="text-4xl font-bold tracking-[5.6px] leading-[64px]">
          {number}
        </span>
        <span className="text-2xl font-bold text-black/48">{label}</span>
      </div>
      <p className="text-base font-medium leading-[1.5] text-black/48">
        {detail}
      </p>
    </div>
  );
}

function TimelineItem({
  dateFrom,
  dateTo,
  company,
  role,
  description,
}: {
  dateFrom: string;
  dateTo: string;
  company: string;
  role: string;
  description: string;
}) {
  return (
    <div className="flex gap-10 md:gap-16">
      <div className="flex shrink-0 flex-col gap-1.5">
        <p className="text-2xl font-semibold leading-[1.2] text-black/48">
          {dateFrom}
        </p>
        <div className="h-2 w-2 shrink-0 rounded-full bg-black/20" />
        <p className="text-2xl font-semibold leading-[1.2] text-black/48">
          {dateTo}
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-4 md:gap-6">
        <div className="flex flex-wrap gap-2 text-2xl md:gap-4">
          <span className="font-bold">{company}</span>
          <span className="font-semibold text-black/80">{role}</span>
        </div>
        <p className="text-base font-medium leading-[1.5] text-black/48">
          {description}
        </p>
      </div>
    </div>
  );
}
