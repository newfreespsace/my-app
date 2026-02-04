// lib/mdx.ts
export function extractHeadings(content: string) {
  // 匹配 ## 和 ### 标题
  const headingRegex = /^(##|###)\s+(.*)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length; // 2 代表 H2, 3 代表 H3
    const title = match[2].trim();
    // 生成 ID 的逻辑要和 rehype-slug 保持一致（通常是转小写，空格换成横杠）
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-') // 支持中文 ID
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    headings.push({ level, title, id });
  }
  return headings;
}
