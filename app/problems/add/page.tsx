import ProblemForm from './_components/ProblemForm';
import { createProblem } from '@/actions/problemActions';

const Page = () => {
  return (
    <div className='max-w-300 mx-auto mt-4'>
      <ProblemForm createAction={createProblem} />
    </div>
  );
};

export default Page;
