// action.ts
'use server';

import dbConnect from '@/lib/db';
import Todo from '@/models/Todo';

export async function createTodo(formData: FormData) {
  const type = formData.get('recurrenceType') as string;
  const rawValue = formData.get('recurrenceValue') as string;
  const processedValues = rawValue ? rawValue.split(',').map((v) => parseInt(v, 10)) : [];

  const newTodo = {
    title: formData.get('todo-title') as string,
    startDate: new Date(formData.get('startDate') as string),
    endDate: formData.get('endDate') ? new Date(formData.get('endDate') as string) : null,
    recurrence: {
      type: type,
      value: processedValues,
    },
  };
  await dbConnect();
  await Todo.create(newTodo);
}
