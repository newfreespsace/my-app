'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { createTodo } from './action';

// --- DatePicker 组件保持不变 ---
function DatePickerField({ value, onChange }: { value: Date | undefined; onChange: (date: Date | undefined) => void }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start font-normal">
          {value ? value.toLocaleDateString() : '请选择日期'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
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

type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly';

export function AddToDoForm() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  // 统一状态管理
  const [recurrenceType, setRecurrenceType] = useState<RecurrenceType>('none');
  const [recurrenceValue, setRecurrenceValue] = useState<string>('');

  // 当切换循环类型时，初始化默认值
  const handleTypeChange = (type: RecurrenceType) => {
    setRecurrenceType(type);
    if (type === 'daily')
      setRecurrenceValue('1'); // 默认每隔1天
    else if (type === 'none') setRecurrenceValue('');
    else setRecurrenceValue(''); // 周和月默认不选
  };

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>新增待办事项</CardTitle>
        <CardDescription>设置任务的执行时间与循环周期。</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="todo-form" action={createTodo}>
          {/* 核心：唯一的隐藏 input，负责向后端发送循环具体值 */}
          <input type="hidden" name="recurrenceValue" value={recurrenceValue} />

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="todo-title">标题</FieldLabel>
              <Input id="todo-title" name="todo-title" placeholder="要做什么？" required />
            </Field>

            <Field>
              <FieldLabel>循环周期</FieldLabel>
              <Select name="recurrenceType" value={recurrenceType} onValueChange={handleTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="请选择循环方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">不循环</SelectItem>
                  <SelectItem value="daily">按天循环</SelectItem>
                  <SelectItem value="weekly">按周循环</SelectItem>
                  <SelectItem value="monthly">按月循环</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            {/* --- 动态子字段 --- */}

            {recurrenceType === 'daily' && (
              <Field>
                <FieldLabel>间隔天数</FieldLabel>
                <Select value={recurrenceValue} onValueChange={setRecurrenceValue}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                      <SelectItem key={d} value={d.toString()}>
                        每隔 {d} 天
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}

            {recurrenceType === 'weekly' && (
              <Field>
                <FieldLabel>选择重复时间 (周)</FieldLabel>
                <ToggleGroup
                  type="multiple"
                  variant="outline"
                  className="justify-start flex-wrap"
                  value={recurrenceValue.split(',').filter(Boolean)}
                  onValueChange={(val) => setRecurrenceValue(val.join(','))}
                >
                  {['一', '二', '三', '四', '五', '六', '日'].map((day, i) => (
                    <ToggleGroupItem key={i} value={(i + 1).toString()} className="w-9 h-9">
                      {day}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </Field>
            )}

            {recurrenceType === 'monthly' && (
              <Field>
                <FieldLabel>选择重复时间 (月)</FieldLabel>
                <ToggleGroup
                  type="multiple"
                  variant="outline"
                  className="grid grid-cols-7"
                  value={recurrenceValue.split(',').filter(Boolean)}
                  onValueChange={(val) => setRecurrenceValue(val.join(','))}
                >
                  {Array.from({ length: 31 }).map((_, i) => (
                    <ToggleGroupItem key={i} value={(i + 1).toString()} className="">
                      {i + 1}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </Field>
            )}

            <hr className="my-2 opacity-50" />

            {/* --- 日期字段 --- */}
            <Field>
              <FieldLabel>开始日期</FieldLabel>
              <input type="hidden" name="startDate" value={startDate?.toISOString() || ''} />
              <DatePickerField value={startDate} onChange={setStartDate} />
            </Field>

            <Field>
              <FieldLabel>结束日期</FieldLabel>
              <input type="hidden" name="endDate" value={endDate?.toISOString() || ''} />
              <DatePickerField value={endDate} onChange={setEndDate} />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button type="button" variant="ghost" onClick={() => window.location.reload()}>
          重置
        </Button>
        <Button type="submit" form="todo-form">
          提交存档
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <AddToDoForm />
    </div>
  );
}
