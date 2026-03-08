import { ViewSwitcher } from "@/components/ViewSwitcher";

/** 静态导出时需声明要生成的路径 */
export function generateStaticParams() {
  return [{ slug: undefined }, { slug: ["detail"] }];
}

/**
 * 可选 catch-all：/ 与 /detail 均由本页处理，首页与详情双视图常驻 DOM，仅切换显示，避免返回时图片二次加载。
 * ViewSwitcher 通过 window.location 读取 from 参数，不再使用 useSearchParams，因此无需 Suspense，页面不会卡在 Loading。
 */
export default function CatchAllPage() {
  return <ViewSwitcher />;
}
