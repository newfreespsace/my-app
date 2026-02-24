'use client';

import { useSearchParams } from 'next/navigation';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';

export default function PaginationWithTotalPage({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  // 获取 URL 中的 page 参数，如果没有则默认为 1
  const page = Number(searchParams.get('page')) || 1;

  // 辅助函数：构建带参数的 URL
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {page === 1 ? (
            <span className={cn(buttonVariants({ variant: 'ghost' }), 'gap-1 pr-2.5 opacity-50 cursor-not-allowed')}>
              <PaginationPrevious />
            </span>
          ) : (
            <PaginationPrevious href={createPageURL(page - 1)} />
          )}
        </PaginationItem>

        {page !== 1 && (
          <PaginationItem>
            <PaginationLink href={createPageURL(1)}>1</PaginationLink>
          </PaginationItem>
        )}

        {page - 7 >= 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {Array.from({ length: Math.max(0, Math.min(7, page - 2)) }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink href={createPageURL(i + Math.max(2, page - 7))}>{i + Math.max(2, page - 7)}</PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink href={createPageURL(page)} isActive>
            {page}
          </PaginationLink>
        </PaginationItem>

        {Array.from({ length: Math.max(0, Math.min(7, totalPages - page - 3)) }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink href={createPageURL(page + i + 1)}>{page + i + 1}</PaginationLink>
          </PaginationItem>
        ))}

        {page + 8 < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {totalPages > 0 && page !== totalPages && (
          <PaginationItem>
            <PaginationLink href={createPageURL(totalPages)}>{totalPages}</PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          {page >= totalPages ? (
            <span className={cn(buttonVariants({ variant: 'ghost' }), 'gap-1 pr-2.5 opacity-50 cursor-not-allowed')}>
              <PaginationNext />
            </span>
          ) : (
            <PaginationNext href={createPageURL(page + 1)} />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
