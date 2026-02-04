import MarkdownViewer from '@/components/MarkdownViewer';
import { Separator } from '@/components/ui/separator';
import dbConnect from '@/lib/db';
import { extractHeadings } from '@/lib/mdx';
import Article from '@/models/Article';
import { TableOfContents } from '@/components/TableOfContents';
import { Table } from 'lucide-react';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await dbConnect();
  const article = await Article.findById(id);

  const headings = extractHeadings(article.content);
  console.log(headings);

  return (
    <div className='w-full'>
      <div className='flex gap-4 mt-3 max-w-300 m-auto'>
        <div className='flex-3'>
          {/* Header 保持在容器内部，这样按钮才能访问到状态 */}
          <header className='flex gap-2 max-w-300 m-auto justify-between pt-4 p-4'>
            <div className='flex flex-col gap-4 mt-4 mb-4'>
              <p className='text-4xl font-bold'>{article.title}</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <p className='text-4xl'>123</p>
              <p>通过</p>
            </div>
          </header>

          <main className='mt-3 max-w-300 m-auto px-4'>
            <MarkdownViewer content={article.content} />
          </main>
        </div>
        {/* 这里的 flex-1 容器必须具有和左侧正文一样的高度，不要设置 h-fit */}
        <div className='flex-1 relative'>
          <aside className='hidden lg:block w-64 sticky top-50 self-start'>
            <div className='border-l-2 border-slate-100 pl-4'>
              <p className='text-sm font-bold text-slate-900 mb-4 uppercase'>本页目录</p>
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Page;
