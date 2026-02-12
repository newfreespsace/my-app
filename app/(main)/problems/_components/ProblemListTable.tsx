'use client';

import Problem from '@/models/Problem';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import PaginationForArticles from '@/components/PaginationForArticles';

// 1. 定义单个 Problem 的结构
interface Problem {
  problemId: number;
  title: string;
}

interface ProblemListTableProps {
  problems: Problem[];
  totalPages: number;
}

export default function ProblemListTable({ problems, totalPages }: ProblemListTableProps) {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>标题 ID</TableHead>
          <TableHead>标题</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {problems.map((problem) => (
          <TableRow
            key={problem.problemId}
            className="cursor-pointer"
            onClick={() => router.push(`/problems/${problem.problemId}`)}
          >
            <TableCell className="w-10 text-base">{problem.problemId}</TableCell>
            <TableCell className="w-10 text-base">{problem.title}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
