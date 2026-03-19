/**
 * 统一的文字与排版样式标尺，供首页和详情页复用。
 *
 * 命名约定：
 * - TEXT_xxx：单行或标题类文字
 * - BODY_xxx：正文段落类文字
 */

/** 页面 / 区块主标题（H1/H2 级别） */
export const TEXT_SECTION_TITLE =
  "text-3xl md:text-4xl font-bold leading-tight text-black";

/** 模块副标题 / 小节标题（H3 级别） */
export const TEXT_SUBTITLE =
  "text-xl md:text-2xl font-bold leading-tight text-black";

/** 小节内的标签型标题（如「Insights」） */
export const TEXT_LABEL =
  "text-base font-semibold leading-snug text-black";

/** 正文主段落（默认阅读色） */
export const BODY_PRIMARY =
  "text-base leading-relaxed text-black/80 break-words";

/** 次要说明 / 图注等较弱层级 */
export const BODY_SECONDARY =
  "text-sm leading-relaxed text-black/70 md:text-base";

/** 数字型统计信息中的数字 */
export const TEXT_STAT_NUMBER =
  "text-3xl md:text-4xl lg:text-5xl font-bold tracking-[4px] leading-[1.3]";

/** 数字型统计信息中的标签 */
export const TEXT_STAT_LABEL =
  "text-xl md:text-2xl font-bold text-black/70";

