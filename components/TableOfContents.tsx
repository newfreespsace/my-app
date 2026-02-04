// components/TableOfContents.tsx
'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function TableOfContents({ headings }: { headings: any[] }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 找到当前正在视口顶部的标题
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      { rootMargin: '-10% 0% -70% 0%' }, // 调整触发高亮的位置
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <ul className='space-y-3'>
      {headings.map((h) => (
        <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 1}rem` }}>
          <a
            href={`#${h.id}`}
            className={cn(
              'text-sm transition-colors block',
              activeId === h.id ? 'text-blue-600 font-medium' : 'text-slate-500 hover:text-slate-900',
            )}
          >
            {h.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
