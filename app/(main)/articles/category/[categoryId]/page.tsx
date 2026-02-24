import Category from '@/models/Category';
import dbConnect from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { ChapterList } from './ChapterList';

const CategoryPage = async ({ params }: { params: Promise<{ categoryId: string }> }) => {
  const { categoryId } = await params;
  await dbConnect();
  const category = await Category.findById(categoryId);
  if (!category) throw Error('无此分类');
  const plainCategory = JSON.parse(JSON.stringify(category));

  // 定义 Server Action
  const addChapterAction = async (formData: FormData) => {
    'use server';
    const chapterName = formData.get('chapterName');
    if (!chapterName) return;

    await dbConnect();
    await Category.findByIdAndUpdate(categoryId, {
      $push: { chapters: { chapterName } },
    });
    revalidatePath(`/articles/chapters/${categoryId}`);
  };

  // 新增：添加小节的 Action
  const addSectionAction = async (chapterId: string, formData: FormData) => {
    'use server';
    const sectionName = formData.get('sectionName');
    if (!sectionName) return;
    await dbConnect();
    // 使用 Mongoose 的 array filter 更新特定 chapter 下的 sections
    await Category.findOneAndUpdate(
      { _id: categoryId, 'chapters._id': chapterId },
      {
        $push: { 'chapters.$.sections': { sectionName } },
      }
    );
    revalidatePath(`/articles/chapters/${categoryId}`);
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] gap-6 p-6">
      {/* 左侧栏：固定宽度 */}
      <aside className="w-64 shrink-0">
        <ChapterList
          category={plainCategory}
          onAddChapterAction={addChapterAction}
          onAddSectionAction={addSectionAction}
        />
      </aside>

      {/* 右侧栏：内容展示区 */}
      <main className="flex-1 bg-slate-50 rounded-lg p-8 border border-dashed">
        <div className="text-center text-muted-foreground mt-20">
          <h2 className="text-2xl font-semibold">{category.categoryName}</h2>
          <p>请从左侧选择章节或点击小节进行编辑</p>
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
