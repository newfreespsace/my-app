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

export default function ArticleListTable({ articles }) {
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
