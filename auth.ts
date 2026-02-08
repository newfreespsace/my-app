import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from './lib/db';
import User from './models/User';
// 导入你的数据库查询方法，例如 prisma
// import { db } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      // 1. 定义登录表单需要的字段
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // 2. 核心验证逻辑
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // 从数据库查找用户 (伪代码)
        // const user = await db.user.findUnique({ where: { email: credentials.email } });
        // const user = { id: '1', email: 'test@example.com', password: 'hashed_password' }; // 模拟数据
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });
        if (!user || !user.password) return null;

        // 验证密码是否匹配
        const isPasswordCorrect = await bcrypt.compare(credentials.password as string, user.password);

        if (isPasswordCorrect) {
          return user; // 验证通过，返回用户信息
        }

        return null; // 验证失败
      },
    }),
  ],
  pages: {
    signIn: '/signin', // 指定你自定义的登录页面路径
  },
});
