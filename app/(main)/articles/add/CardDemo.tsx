import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArticleData } from '@/app/(main)/articles/add/AddArticleAndPreview';
import MarkdownViewer from '@/app/(main)/_components/MarkdownViewer';

export function CardDemo({ article }: { article: ArticleData }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>文章预览</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <h2 className="">标题</h2>
              <p>{article.title}</p>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">正文</Label>
              </div>
              {/*<p> {article.content} </p>*/}
              <MarkdownViewer content={article.content} />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
