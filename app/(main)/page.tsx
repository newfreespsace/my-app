import { getTodosWithStatus } from '@/actions/todoActions';
import { CardDemo } from './_components/ToDo';
import { serialize } from '@/lib/utils';

export default async function Page() {
  const todos = await getTodosWithStatus();

  return (
    <div className="max-w-100 m-auto">
      <CardDemo todos={serialize(todos)} />;
    </div>
  );
}
