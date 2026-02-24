import MarkdownViewer from '@/app/(main)/_components/MarkdownViewer';
import dbConnect from '@/lib/db';
import { extractHeadings } from '@/lib/mdx';
import Article, { IArticle } from '@/models/Article';
import { TableOfContents } from '@/app/(main)/articles/_components/TableOfContents';
import ArticleTagList from '../_components/ArticleTagList';
import { ITag } from '@/models/Tag';
import { buttonVariants } from '@/components/ui/button';
import DeleteArticleButton from '@/app/(main)/_components/DeleteArticleButton';
import Link from 'next/link';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await dbConnect();
  const article = (await Article.findById(id).populate('tags').lean()) as
    | (Omit<IArticle, 'tags'> & { tags: ITag[] })
    | null;
  if (!article) throw new Error('无此文章');

  const headings = extractHeadings(article.content ? article.content : '');

  return (
    <div className="flex flex-col gap-2 max-w-300 mx-auto">
      <div className="flex justify-end gap-2">
        <Link href={`/articles/${id}/edit`} className={buttonVariants()}>
          编辑文章
        </Link>
        <DeleteArticleButton id={id} />
      </div>
      <div className="flex gap-4 w-full m-auto ">
        <div className="flex-1 "></div>
        <div className="flex-3 ">
          <header className="flex flex-col gap-2 max-w-300 m-auto justify-between">
            <h1 className="relative inline-block text-2xl font-bold">
              <span className="relative z-10">{article.title}</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-200 -z-10 opacity-60"></span>
            </h1>
            <div className="flex justify-start gap-2 text-gray-500 italic">
              <p>
                创建时间：{article.createdAt.toLocaleDateString()} {article.createdAt.toLocaleTimeString()}
              </p>
              <p>
                修改时间：：{article.updatedAt.toLocaleDateString()} {article.updatedAt.toLocaleTimeString()}
              </p>
            </div>
          </header>

          <main className="mt-3 max-w-300 m-auto">
            <MarkdownViewer content={article.content ? article.content : ''} />
          </main>

          {article.tags.length > 0 && <ArticleTagList tags={article.tags} />}
        </div>
        <div className="flex-1 relative ">
          <aside className="hidden lg:block w-64 sticky top-50 self-start">
            <div className="border-l-2 border-slate-100 pl-4">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Page;
