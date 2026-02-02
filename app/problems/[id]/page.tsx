import Problem from '@/models/Problem';
import { ProblemDeleteButton } from '@/components/DeleteButton';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

import MarkdownViewer from '@/components/MarkdownViewer';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const problem = await Problem.findById(id);

  return (
    <>
      <div className=''>
        <header className='bg-blue-100'>
          <header className=' flex gap-2  max-w-300 m-auto justify-between pt-8'>
            <div className='flex flex-col gap-4'>
              <p className='text-4xl bold'>{`#137. ${problem.title}`}</p>
              <div className='flex gap-2 m-2'>
                <Button>占位</Button>
                <Button>占位</Button>
                <Button>占位</Button>
              </div>
            </div>
            <div className='flex gap-6'>
              <div className='flex flex-col items-center justify-center'>
                <p className='text-4xl'>123</p>
                <p>通过</p>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <p className='text-4xl'>2323</p>
                <p>提交</p>
              </div>
            </div>
          </header>
        </header>
        <div className='flex gap-4 mt-10 max-w-300 m-auto items-start'>
          <div className='flex-2 border rounded-lg p-4 bg-card'>
            <MarkdownViewer content={problem.content} />
          </div>
          <div className='flex-1 flex-col gap-4 flex'>
            <div className='border rounded-lg p-4 bg-card'>右边1</div>
            <div className='border rounded-lg p-4 bg-card'>右边2</div>
            <div className='border rounded-lg p-4 bg-card flex gap-2'>
              <Button>
                <Edit />
                编辑
              </Button>
              <ProblemDeleteButton id={id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
