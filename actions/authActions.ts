'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import delay from '@/lib/delay';
import User from '@/models/User';

export async function authenticate(formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return '账号或密码错误';
        default:
          return '登录失败，请稍后再试';
      }
    }
    throw error;
  }
}

export type RegisterFormState = {
  message: string;
  success: boolean;
  fields?: {
    name?: string;
    email?: string;
  };
} | null; // 初始状态可能为 null

export async function register(prevState: RegisterFormState, formData: FormData) {
  // const { email, password, name } = values;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirm-password') as string;

  // 定义一个基础的返回对象，包含用户刚才填的内容
  const fields = { name, email };

  console.log(password, confirmPassword);
  await dbConnect();
  await delay(2000);

  if (password !== confirmPassword) return { message: '两次输入的密码不一致', success: false, fields };
  const existingUser = await User.findOne({ email });
  if (existingUser) return { message: '邮箱已被注册', success: false, fields };

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashedPassword });

  // 4. (可选) 注册成功后直接调用 signIn 自动登录
  // await signIn("credentials", { email, password, redirectTo: "/dashboard" });

  return { message: '注册成功，页面即将跳转', success: true };
}
