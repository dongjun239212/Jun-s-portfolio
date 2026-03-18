/** min-h-11 (44px) 满足触控最小点击区域 */
export const SIDEBAR_NAV_LINK_BASE =
  "group flex min-h-11 w-full items-center gap-1.5 rounded-full px-4 py-3 text-base font-medium leading-[1.25] transition-[transform,background-color,color] duration-200 ease-out hover:bg-red-500/[0.06] hover:text-red-600 active:scale-[0.985] active:bg-red-500/[0.10]";

/** 非选中用实心灰，与图标一致，避免透明度叠加导致偏淡 */
export const SIDEBAR_NAV_LINK_DEFAULT = `${SIDEBAR_NAV_LINK_BASE} text-neutral-500`;
export const SIDEBAR_NAV_LINK_ACTIVE = `${SIDEBAR_NAV_LINK_BASE} text-red-600`;
