import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw'; // 1. 引入插件
import rehypeSanitize from 'rehype-sanitize';

import 'katex/dist/katex.min.css';

export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <article
      className="prose dark:prose-invert max-w-none /* 调整段落垂直间距 */
  prose-p:my-1 
  /* 调整列表间距 */
  prose-li:my-0 
  /* 调整标题间距 */
  prose-headings:my-3 first:prose-p:mt-0 first:prose-headings:mt-0"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeKatex, rehypeSlug]}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
