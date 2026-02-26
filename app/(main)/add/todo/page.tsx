'use client';

import * as React from 'react';
import { useState } from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { createTodo } from './action';

// 修改后的 DatePickerSimple
function DatePickerField({ value, onChange }: { value: Date | undefined; onChange: (date: Date | undefined) => void }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className="w-full justify-start font-normal" // 改为 w-full 适应表单宽度
        >
          {value ? value.toLocaleDateString() : '选择日期'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          defaultMonth={value}
          captionLayout="dropdown"
          startMonth={new Date()}
          endMonth={new Date(new Date().getFullYear() + 5, new Date().getMonth(), new Date().getDate())}
          hidden={{ before: new Date() }}
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
          onSelect={(date) => {
            onChange(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export function BugReportForm() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>新增待办事项</CardTitle>
        <CardDescription>在这里新增待办事项，事项可以设置为单次或循环。</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" action={createTodo}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="todo-title">标题</FieldLabel>
              <Input id="todo-title" name="todo-title" />
            </Field>

            <Field>
              <FieldLabel>开始日期</FieldLabel>
              <DatePickerField value={startDate} onChange={setStartDate} />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => {}}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}

const Page = () => {
  return (
    <div className="w-100 m-auto">
      <BugReportForm />
    </div>
  );
};

export default Page;
