import Problem from '@/models/Problem';
import dbConnect from '@/lib/db';

import ProblemClientContainer from './ProblemClientContainer';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await dbConnect();
  const problem = await Problem.findOne({ problemId: id });
  await new Promise((resolve) => setTimeout(resolve, 4000));

  if (!problem) {
    throw new Error('该题目已不存在或已被删除');
  }

  const safeProblem = JSON.parse(JSON.stringify(problem));

  return <ProblemClientContainer problem={safeProblem} />;
};

export default Page;
