import { COLOR_MAP } from '@/constants/colors'; // 假设这里包含 bg-red-500 等
import { cn } from '@/lib/utils';
import { TagColor } from '@/models/Tag';

const ArticleTagList = async ({ tags }: { tags: { id: string; tagColor: TagColor; tagName: string }[] }) => {
  return (
    <div className="space-y-4 p-4">
      {/* 使用 flex-wrap 确保在手机端能自动换行 */}
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <div
            key={tag.tagName}
            className={cn(
              // 基础布局：水平垂直居中，过渡动画
              'inline-flex items-center justify-center px-3 py-1 text-sm font-medium',
              'rounded-full transition-all duration-200 hover:scale-105 hover:shadow-sm cursor-default',
              // 颜色应用
              COLOR_MAP[tag.tagColor] || 'bg-gray-100 text-gray-800',
              // 如果你的 COLOR_MAP 只有背景色，这里确保文字是白色的（或者根据背景调）
              'text-white shadow-sm'
            )}
          >
            {/* 前置一个小圆点装饰（可选，增加精致感） */}
            <span className="mr-1.5 h-2 w-2 rounded-full bg-white/40" />
            {tag.tagName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleTagList;
