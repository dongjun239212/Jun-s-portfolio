/**
 * 首页侧栏导航胶囊按钮样式，供 SidebarNav 与详情页「Back to homepage」等复用。
 */
export const SIDEBAR_NAV_LINK_BASE =
  "group flex items-center gap-2 rounded-full p-2.5 text-base font-semibold leading-[1.25] hover:bg-red-500/[0.06] hover:text-red-600";

/** 非选中用实心灰，与图标一致，避免透明度叠加导致偏淡 */
export const SIDEBAR_NAV_LINK_DEFAULT = `${SIDEBAR_NAV_LINK_BASE} text-neutral-500`;
export const SIDEBAR_NAV_LINK_ACTIVE = `${SIDEBAR_NAV_LINK_BASE} text-red-600`;
