'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';

import { SignupSchema, type SignupType } from '@/lib/schema';

export async function authenticate(prevState: { success: boolean; message: string }, formData: FormData) {
  try {
    await signIn('credentials', { ...Object.fromEntries(formData), redirect: false });
    return { success: true, message: '登录成功' };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        message: error.type === 'CredentialsSignin' ? '账号密码错误' : '登录失败',
      };
    }
    throw error;
  }
}

// 定义返回类型，方便前端处理
export type RegisterResponse = {
  success: boolean;
  message: string;
  errors?: Partial<Record<keyof SignupType, string[]>>; // 用于存放字段级别的错误
} | null;

export async function register(prevState: RegisterResponse, data: SignupType): Promise<RegisterResponse> {
  // 1. 使用 Zod 进行服务端验证
  const validatedFields = SignupSchema.safeParse(data);

  // 如果验证失败，直接返回错误信息
  if (!validatedFields.success) {
    return {
      success: false,
      message: '数据格式验证失败',
      errors: validatedFields.error.flatten().fieldErrors as Partial<Record<keyof SignupType, string[]>>,
    };
  }
  // 解构验证后的安全数据
  const { email, password, name } = validatedFields.data;

  try {
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) return { message: '邮箱已被注册', success: false, errors: { email: ['该邮箱已被占用'] } }; // 精确反馈到邮箱字段 };

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    return { message: '注册成功，页面即将跳转', success: true };
  } catch (error) {
    console.error('注册异常:', error);
    return {
      success: false,
      message: '服务器内部错误，请稍后再试',
    };
  }
}
