import { Check } from 'lucide-react';
import { cn } from '@/lib/utils'; // Shadcn/UI 常用的类名合并工具
import { TAG_COLORS, COLOR_MAP } from '@/constants/colors';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    // flex-wrap 自动换行。第一行排不下时，剩下的元素跳到下一行
    <div className='flex flex-wrap gap-3 p-2'>
      {TAG_COLORS.map((color) => (
        <button
          key={color}
          type='button'
          onClick={() => onChange(color)}
          // relative 使用 relative 后，你可以通过 top, bottom, left, right 等偏移属性来移动元素。
          // transition-all 让元素的所有可动画属性在发生变化时，产生平滑的过渡效果，而不是瞬间切换

          className={cn(
            'relative w-8 h-8 bg-amber-200 rounded-full transition-all hover:scale-110  active:scale-95 flex items-center justify-center',
            COLOR_MAP[color as keyof typeof COLOR_MAP],
            value === color
              ? 'ring-2 ring-offset-2 ring-slate-400'
              : 'opacity-80',
          )}
        >
          {value === color && (
            // animate-in 搭配 zoom-in-50 duration-200，表示从%50 缩放至 100%, 在200 ms内
            <Check className='w-4 h-4 text-white animate-in zoom-in-50 duration-200' />
          )}
        </button>
      ))}
    </div>
  );
}
