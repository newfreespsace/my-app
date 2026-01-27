"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// 1. 定义单个 Article 的结构
interface Article {
  _id: string | number;
  content: string;
  // 如果还有其他字段，可以在这里继续添加，例如：
  // title?: string;
}

// 2. 定义组件 Props 的接口
interface ArticleListTableProps {
  articles: Article[];
}

export default function ArticleListTable({ articles }: ArticleListTableProps) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">题目 ID</TableHead>
          <TableHead>标题</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.map((article) => (
          <TableRow key={article._id} onClick={() => console.log("aa")}>
            <TableCell className="font-medium">{article._id}</TableCell>
            <TableCell className="w-10">{article.content}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
