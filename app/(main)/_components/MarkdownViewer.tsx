import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { Info, Lightbulb, TriangleAlert, AlertCircle } from 'lucide-react';
import rehypeHighlight from 'rehype-highlight';
// 你还需要引入一个 CSS 主题，否则依然没有颜色
import 'highlight.js/styles/github-dark.css'; // 或者你喜欢的其他主题

import 'katex/dist/katex.min.css';

function remarkAdmonitions() {
  return (tree: any) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective' || node.type === 'leafDirective' || node.type === 'textDirective') {
        const data = node.data || (node.data = {});
        // 关键点：设置 hName 以便渲染器知道这是什么 HTML 标签
        data.hName = node.type === 'textDirective' ? 'span' : 'div';
        data.hProperties = {
          // 这里我们生成类名
          className: `admonition admonition-${node.name}`,
        };
      }
    });
  };
}

const icons: Record<string, React.ReactNode> = {
  important: <AlertCircle className="w-4 h-4 mr-2" />,
  note: <Info className="w-4 h-4 mr-2" />,
  tip: <Lightbulb className="w-4 h-4 mr-2" />,
  warning: <TriangleAlert className="w-4 h-4 mr-2" />,
};

export default function MarkdownViewer({ content }: { content: string | null | undefined }) {
  return (
    <article className="prose dark:prose-invert max-w-none prose-li:my-0 prose-headings:my-3 first:prose-p:mt-0 first:prose-headings:mt-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, remarkDirective, remarkAdmonitions]}
        rehypePlugins={[
          rehypeRaw,
          [rehypeHighlight, { detect: true, ignoreMissing: true }], // 添加这一行
          [
            rehypeSanitize,
            {
              ...defaultSchema,
              attributes: {
                ...defaultSchema.attributes,
                // 这里的关键：直接允许 className。
                // v4 的 CSS 可能需要具体的 className 字符串通过过滤。
                div: [...(defaultSchema.attributes?.div || []), 'className'],
                span: [...(defaultSchema.attributes?.span || []), 'className'],
                code: [...(defaultSchema.attributes?.code || []), 'className'],
              },
            },
          ],
          rehypeKatex,
          rehypeSlug,
        ]}
        components={{
          // 我们覆盖 div 的渲染，拦截带有 admonition 类的 div

          div: ({ node, className, children, ...props }) => {
            if (className?.split(' ').includes('admonition')) {
              // 提取具体的类型，如 important, note
              const type =
                className
                  .split(' ')
                  .find((c) => c.startsWith('admonition-'))
                  ?.replace('admonition-', '') || '';

              const labels: Record<string, string> = {
                important: 'important',
                note: 'note',
                tip: 'tip',
                warning: 'warning',
              };

              return (
                <div className={className} {...props}>
                  <div className="admonition-title">
                    {icons[type] || null}
                    {labels[type] || type.toUpperCase()}
                  </div>
                  <div className="admonition-content">{children}</div>
                </div>
              );
            }
            return (
              <div className={className} {...props}>
                {children}
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
