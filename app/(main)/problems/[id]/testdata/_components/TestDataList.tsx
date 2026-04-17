// 这是一个专门负责取数和渲染列表的组件
import { ProblemTestDataList } from '@/actions/problemActions';

export default async function TestDataList({ problemId }: { problemId: number }) {
  const { files } = await ProblemTestDataList(problemId);

  return (
    <div>
      {files.map((file) => (
        <p key={file.id}>{file.name}</p>
      ))}
    </div>
  );
}
