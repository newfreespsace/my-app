'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useRouter } from 'next/navigation';
// 1. 定义单个 Article 的结构
interface Article {
  id: string;
  title: string;
}

// 2. 定义组件 Props 的接口
interface ArticleListTableProps {
  articles: Article[];
}

export default function ArticleTItleListTable({ articles }: ArticleListTableProps) {
  const router = useRouter();
  return (
    <Table>
      {/* <TableHeader>
        <TableRow>
          <TableHead>标题</TableHead>
        </TableRow>
      </TableHeader> */}
      <TableBody>
        {articles.map((article) => (
          <TableRow
            key={article.id}
            onClick={() => {
              router.push(`/articles/${article.id}`);
            }}
            className='cursor-pointer'
          >
            <TableCell className='text-base'>{article.title}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
