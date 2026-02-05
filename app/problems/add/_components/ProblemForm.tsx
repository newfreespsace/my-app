'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react'; // 引入图标增加美感

export default function ProblemForm({ createAction }: { createAction: (formData: FormData) => void }) {
  // 管理样例列表，初始有一组
  const [samples, setSamples] = useState([{ input: '', output: '' }]);

  const addSample = () => {
    setSamples([...samples, { input: '', output: '' }]);
  };

  const removeSample = (index: number) => {
    if (samples.length <= 1) return; // 至少保留一组
    setSamples(samples.filter((_, i) => i !== index));
  };

  return (
    <form action={createAction}>
      <FieldGroup>
        {/* ... 其他固定字段 (ID, Title, Description 等) ... */}
        <Field>
          <FieldLabel htmlFor='problemId'>题目 ID</FieldLabel>
          <Input
            id='problemId'
            name='problemId'
            placeholder='题目 ID，留空则自动分配'
            className='resize-none'
            type='number'
            min='1'
          ></Input>
        </Field>
        <Field>
          <FieldLabel htmlFor='title'>标题</FieldLabel>
          <Input id='title' name='title' placeholder='' className='resize-none' />
        </Field>
        <Field>
          <FieldLabel htmlFor='description'>题目描述</FieldLabel>
          <Textarea id='description' name='description' placeholder='' className='resize-none' />
        </Field>
        <Field>
          <FieldLabel htmlFor='input_format'>输入格式</FieldLabel>
          <Textarea id='input_format' name='input_format' placeholder='' className='resize-none' />
        </Field>
        <Field>
          <FieldLabel htmlFor='output_format'>输出格式</FieldLabel>
          <Textarea id='output_format' name='output_format' placeholder='' className='resize-none' />
        </Field>

        <div className='space-y-4 border-t pt-4 mt-4'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-bold'>测试样例</h3>
            <Button type='button' variant='outline' size='sm' onClick={addSample}>
              <Plus className='w-4 h-4 mr-2' /> 新增样例
            </Button>
          </div>

          {samples.map((_, index) => (
            <div key={index} className='p-4 border rounded-lg bg-slate-50 relative space-y-4'>
              <div className='flex justify-between items-center'>
                <span className='text-sm font-medium text-slate-500'>样例 #{index + 1}</span>
                {samples.length > 1 && (
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='text-red-500 hover:text-red-700'
                    onClick={() => removeSample(index)}
                  >
                    <Trash2 className='w-4 h-4' />
                  </Button>
                )}
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <Field>
                  <FieldLabel>输入样例</FieldLabel>
                  <Textarea name={`sample_input_${index}`} className='bg-white font-mono' placeholder='Input data...' />
                </Field>
                <Field>
                  <FieldLabel>输出样例</FieldLabel>
                  <Textarea name={`sample_output_${index}`} className='bg-white font-mono' placeholder='Expected output...' />
                </Field>
              </div>
            </div>
          ))}
        </div>

        <Button type='submit' className='w-full mt-6'>
          发布题目
        </Button>
      </FieldGroup>
    </form>
  );
}
