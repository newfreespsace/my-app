'use client';

import Problem from '@/models/Problem';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useRouter } from 'next/navigation';

// 1. 定义单个 Problem 的结构
interface Problem {
  _id: string | number;
  content: string;
  // 如果还有其他字段，可以在这里继续添加，例如：
  title: string;
}

interface ProblemListTableProps {
  problems: Problem[];
}

export default function ProblemListTable({ problems }: ProblemListTableProps) {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>标题</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {problems.map((problem) => (
          <TableRow key={problem._id} className='cursor-pointer' onClick={() => router.push(`/problems/${problem._id}`)}>
            <TableCell className='w-10 text-base'>{problem.title}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
