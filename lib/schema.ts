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

export const SignupSchema = z
  .object({
    name: z.string().min(3, '至少 3 个字符').max(10, '最多 10 个字符'),
    email: z.email('请输入有效的邮箱地址'),
    password: z.string().min(6, '至少 6 个字符').max(50, '太长了，不能超过 50'),
    confirmPassword: z.string().min(6, '至少 6 个字符').max(50, '太长了，不能超过 50'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'], // 重点：这会让错误信息挂在 confirmPassword 字段下
  });

export type SignupType = z.infer<typeof SignupSchema>;
