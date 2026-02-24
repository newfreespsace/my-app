import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArticleData } from '@/app/(main)/articles/add/AddArticleAndPreview';
import MarkdownViewer from '@/app/(main)/_components/MarkdownViewer';

export function CardDemo({ article }: { article: ArticleData }) {
  return (
    <Card className="w-full">
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <p className={'text-4xl font-extrabold'}>{article.title}</p>
            <MarkdownViewer content={article.content} />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
