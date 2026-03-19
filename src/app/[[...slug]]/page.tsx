import { Suspense } from "react";
import { ViewSwitcher } from "@/components/layout";

/** 静态导出时需声明要生成的路径 */
export function generateStaticParams() {
  return [{ slug: undefined }, { slug: ["detail"] }];
}

/**
 * 可选 catch-all：/ 与 /detail 均由本页处理，首页与详情双视图常驻 DOM，仅切换显示，避免返回时图片二次加载。
 * ViewSwitcher 内部使用 useSearchParams 读取 from 参数，因此需要用 Suspense 包裹以满足 Next.js 要求。
 */
export default function CatchAllPage() {
  return (
    <Suspense fallback={null}>
      <ViewSwitcher />
    </Suspense>
  );
}
