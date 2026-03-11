'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
// 1. 定义单个 Article 的结构
interface Article {
  id: string;
  title: string;
  createTime: Date;
}

// 2. 定义组件 Props 的接口
interface ArticleListTableProps {
  articles: Article[];
}

export default function ArticleTItleListTable({ articles }: ArticleListTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>标题</TableHead>
          <TableHead className=" text-right">创建时间</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.map((article) => (
          <TableRow key={article.id}>
            <TableCell className="text-base">
              <Link href={`/articles/${article.id}`} prefetch={false}>
                {article.title}
              </Link>
            </TableCell>
            <TableCell className="text-base text-gray-400 text-right">
              {article.createTime.toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
