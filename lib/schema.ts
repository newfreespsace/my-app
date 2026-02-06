import { z } from 'zod';

export const ProblemFormSchema = z.object({
  title: z.string().min(1, '标题必填'),
  problemId: z.preprocess((val) => (val === '' || val === null ? undefined : Number(val)), z.number().optional()),
  description: z.string().optional().default(''),
  input_format: z.string().optional().default(''),
  output_format: z.string().optional().default(''),
  hint: z.string().optional().default(''),
  // samples 也可以定义在这里
  sample_count: z.preprocess((val) => Number(val || 0), z.number()),
});

// 导出类型供 TypeScript 使用
export type ProblemFormValues = z.infer<typeof ProblemFormSchema>;
