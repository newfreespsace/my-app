'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

// 定义一个干净的、经过序列化后的类型
interface PlainSection {
  _id: string;
  sectionName: string;
}

interface PlainChapter {
  _id: string;
  chapterName: string;
  sections: PlainSection[];
}

interface PlainCategory {
  _id: string;
  categoryName: string;
  chapters: PlainChapter[];
}

export function ChapterList({
  category,
  onAddChapterAction,
  onAddSectionAction,
}: {
  category: PlainCategory;
  onAddChapterAction: (formData: FormData) => void;
  onAddSectionAction: (chapterId: string, formData: FormData) => void; // 定义类型
}) {
  // 用于提交后清空输入框 (可选)
  // const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="flex flex-col h-full border-r pr-4">
      <h2 className="text-lg font-bold mb-4">{category.categoryName}</h2>

      {/* 使用 flex-1 和 overflow-y-auto 确保目录多了可以滚动，而新增章节框固定在底部 */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <Accordion type="single" collapsible className="w-full">
          {category.chapters.map(
            (chapter: { _id: string; chapterName: string; sections: { _id: string; sectionName: string }[] }) => (
              <AccordionItem value={chapter._id} key={chapter._id}>
                <AccordionTrigger className="hover:no-underline py-2">
                  <span className="text-sm font-medium">{chapter.chapterName}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col ">
                    {/* 已有小节列表 */}
                    <div className="flex flex-col border-l-2 space-y-1 ml-2 pb-2">
                      {chapter.sections?.map((section) => (
                        <button
                          key={section._id}
                          className="text-xs text-muted-foreground hover:text-primary text-left pl-4 py-1 transition-colors"
                        >
                          {section.sectionName}
                        </button>
                      ))}
                    </div>
                    {/* --- 新增小节表单 --- */}
                    <form
                      action={(formData) => {
                        onAddSectionAction(chapter._id, formData);
                        (document.getElementById(`input-section-${chapter._id}`) as HTMLInputElement).value = '';
                      }}
                      className="flex items-center gap-1 pl-0 mt-2"
                    >
                      <Input
                        id={`input-section-${chapter._id}`}
                        name="sectionName"
                        placeholder="新小节..."
                        className="h-7 text-[10px] px-2 flex-1"
                        required
                      />
                      <Button
                        type="submit"
                        size="sm"
                        variant="ghost"
                        className="h-7 px-1 text-muted-foreground hover:text-primary"
                      >
                        <PlusIcon className="w-3 h-3" />
                      </Button>
                    </form>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          )}
        </Accordion>
      </div>

      {/* --- 底部的“新增章节” --- */}
      <div className="mt-auto pt-4 border-t shrink-0">
        <form
          action={(formData) => {
            onAddChapterAction(formData);
            (document.getElementById('input-chapter') as HTMLInputElement).value = '';
          }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <Input id="input-chapter" name="chapterName" placeholder="新章节名称..." className="h-8 text-xs" required />
            <Button type="submit" size="sm" className="h-8 px-2">
              <PlusIcon className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
