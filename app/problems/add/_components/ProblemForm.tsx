'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react'; // 引入图标增加美感

interface Sample {
  id: string; // 内部唯一标识
  input: string;
  output: string;
}

export default function ProblemForm({ createAction }: { createAction: (formData: FormData) => void }) {
  // 管理样例列表，初始有一组
  const [samples, setSamples] = useState<Sample[]>([{ id: crypto.randomUUID(), input: '', output: '' }]);

  const addSample = () => {
    setSamples([...samples, { id: crypto.randomUUID(), input: '', output: '' }]);
  };

  const removeSample = (id: string) => {
    if (samples.length <= 1) return; // 至少保留一组
    setSamples(samples.filter((s) => s.id !== id));
  };

  const updateSample = (id: string, field: 'input' | 'output', value: string) => {
    setSamples(samples.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
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

          {samples.map((sample, index) => (
            <div key={index} className='p-4 border rounded-lg bg-slate-50 relative space-y-4'>
              <div className='flex justify-between items-center'>
                <span className='text-sm font-medium text-slate-500'>样例 #{index + 1}</span>
                {samples.length > 1 && (
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='text-red-500 hover:text-red-700'
                    onClick={() => removeSample(sample.id)}
                  >
                    <Trash2 className='w-4 h-4' />
                  </Button>
                )}
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <Field>
                  <FieldLabel>输入样例</FieldLabel>
                  <Textarea
                    name={`sample_input_${index}`}
                    value={sample.input}
                    onChange={(e) => updateSample(sample.id, 'input', e.target.value)}
                    className='bg-white font-mono'
                    placeholder='Input data...'
                  />
                </Field>
                <Field>
                  <FieldLabel>输出样例</FieldLabel>
                  <Textarea
                    name={`sample_output_${index}`}
                    value={sample.output}
                    onChange={(e) => updateSample(sample.id, 'output', e.target.value)}
                    className='bg-white font-mono'
                    placeholder='Expected output...'
                  />
                </Field>
              </div>
            </div>
          ))}
          {/* 技巧：向后端传递样例总数，方便后端循环解析 */}
          <input type='hidden' name='sample_count' value={samples.length} />
        </div>

        <Button type='submit' className='w-full mt-6'>
          发布题目
        </Button>
      </FieldGroup>
    </form>
  );
}
