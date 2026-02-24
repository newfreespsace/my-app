import Problem from '@/models/Problem';
import dbConnect from '@/lib/db';

import ProblemClientContainer from './_components/ProblemClientContainer';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  // 将字符串 id 转换为数字
  const numericId = Number(id);

  // 容错处理：如果 URL 里的 id 不是有效的数字（比如 /problems/abc）
  if (isNaN(numericId)) {
    throw new Error('无效的题目 ID 格式');
  }

  await dbConnect();

  const problem = await Problem.findOne({ problemId: numericId });
  if (!problem) {
    throw new Error('该题目已不存在或已被删除');
  }

  const safeProblem = JSON.parse(JSON.stringify(problem));

  return <ProblemClientContainer problem={safeProblem} />;
};

export default Page;
