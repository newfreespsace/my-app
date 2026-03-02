'use client';

import Problem from '@/models/Problem';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useRouter } from 'next/navigation';

interface Problem {
  problemId: number;
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
          <TableHead>题目 ID</TableHead>
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
            <TableCell className="">{problem.problemId}</TableCell>
            <TableCell className="">{problem.title}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
