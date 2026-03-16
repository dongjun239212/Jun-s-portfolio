export const SIDEBAR_NAV_LINK_BASE =
  "group flex w-full items-center gap-1.5 rounded-full px-4 py-3 text-base font-medium leading-[1.25] hover:bg-red-500/[0.06] hover:text-red-600";

/** 非选中用实心灰，与图标一致，避免透明度叠加导致偏淡 */
export const SIDEBAR_NAV_LINK_DEFAULT = `${SIDEBAR_NAV_LINK_BASE} text-neutral-500`;
export const SIDEBAR_NAV_LINK_ACTIVE = `${SIDEBAR_NAV_LINK_BASE} text-red-600`;
