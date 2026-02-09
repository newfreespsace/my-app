'use client';

import { useActionState, startTransition, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { register } from '@/actions/authActions';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { SignupSchema } from '@/lib/schema';
import { SignupType } from '@/lib/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

export function SignupForm({ className, ...props }: React.ComponentProps<'form'>) {
  const router = useRouter();
  const form = useForm<SignupType>({
    resolver: zodResolver(SignupSchema),
    mode: 'onChange',

    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [state, formAction, isPending] = useActionState(register, null);

  useEffect(() => {
    if (!state) return;

    // 1. 处理字段级错误（重点：将后端 Zod 错误映射回 RHF）
    if (state.errors) {
      Object.entries(state.errors).forEach(([key, messages]) => {
        form.setError(key as keyof SignupType, {
          type: 'server',
          message: messages?.[0], // 取 Zod 返回的第一条错误信息
        });
      });
    }

    if (state?.success) {
      toast.success(state.message);
      setTimeout(() => {
        router.push('/signin');
      }, 2000);
    }

    // 3. 处理全局逻辑错误（非字段错误，如“服务器崩溃”）
    if (!state.success && state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state, router, form]);

  const onSubmit = (data: SignupType) => {
    startTransition(() => {
      formAction(data);
    });
  };

  return (
    <form className={cn('flex flex-col gap-6', className)} {...props} onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h1 className='text-2xl font-bold'>Create your account</h1>
          <p className='text-muted-foreground text-sm text-balance'>Fill in the form below to create your account</p>
        </div>

        <Field>
          <FieldLabel htmlFor='name'>Full Name</FieldLabel>
          <Input
            {...form.register('name')}
            id='name'
            type='text'
            placeholder='John Doe'
            aria-invalid={!!form.formState.errors.name}
          />
          {form.formState.errors.name && <FieldError errors={[form.formState.errors.name]} />}
        </Field>

        <Field>
          <FieldLabel htmlFor='email'>Email</FieldLabel>
          <Input {...form.register('email')} id='email' type='text' placeholder='m@example.com' required />
          {form.formState.errors.email && <FieldError errors={[form.formState.errors.email]} />}
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email with anyone else.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor='password'>Password</FieldLabel>
          <Input {...form.register('password')} id='password' type='password' required />
          {form.formState.errors.password && <FieldError errors={[form.formState.errors.password]} />}
          <FieldDescription>Must be at least 8 characters long.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor='confirm-password'>Confirm Password</FieldLabel>
          <Input {...form.register('confirmPassword')} id='confirm-password' type='password' required />
          {form.formState.errors.confirmPassword && <FieldError errors={[form.formState.errors.confirmPassword]} />}
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>

        <Field>
          <Button type='submit' disabled={isPending} className='relative flex items-center justify-center gap-2'>
            {isPending && <Loader2 className='animate-spin' />}
            {isPending ? 'Creating...' : 'Create Account'}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button variant='outline' type='button'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <path
                d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'
                fill='currentColor'
              />
            </svg>
            Sign up with GitHub
          </Button>
          <FieldDescription className='px-6 text-center'>
            Already have an account? <a href='#'>Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
