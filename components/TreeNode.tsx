'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, FileText, Folder } from 'lucide-react';

export default function TreeNode({ node }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className='ml-4'>
      <div className='flex items-center gap-2 py-1 cursor-pointer hover:bg-slate-100 rounded' onClick={() => setIsOpen(!isOpen)}>
        {node.isFolder ? (
          <>
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <Folder size={16} className='text-blue-500' />
          </>
        ) : (
          <FileText size={16} className='text-slate-400 ml-5' />
        )}
        <span className={node.isFolder ? 'font-medium' : 'text-sm'}>{node.title}</span>
      </div>

      {/* 如果是目录且处于打开状态，递归渲染子节点 */}
      {isOpen && hasChildren && (
        <div className='border-l ml-2'>
          {node.children.map((child) => (
            <TreeNode key={child._id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}
