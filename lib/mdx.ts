// lib/mdx.ts
export function extractHeadings(content: string) {
  // 匹配 ## 和 ### 标题
  const headingRegex = /^(##|###)\s+(.*)$/gm;
  const headings = [];
  const idCounts: { [key: string]: number } = {}; // 用于记录 ID 出现的次数
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length; // 2 代表 H2, 3 代表 H3
    const title = match[2].trim();
    // 生成 ID 的逻辑要和 rehype-slug 保持一致（通常是转小写，空格换成横杠）
    // 1. 生成基础 ID
    let baseId = title
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    // 如果标题全是特殊字符导致 baseId 为空，给个保底值
    if (!baseId) baseId = 'section';

    // 2. 处理重复 ID (逻辑逻辑同 rehype-slug)
    let finalId = baseId;
    if (idCounts[baseId] !== undefined) {
      // 如果已经存在，则在后面加上计数
      idCounts[baseId]++;
      finalId = `${baseId}-${idCounts[baseId]}`;
    } else {
      // 第一次出现
      idCounts[baseId] = 0;
    }

    headings.push({ level, title, id: finalId });
  }
  return headings;
}
