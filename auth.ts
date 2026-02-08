import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from './lib/db';
import User from './models/User';
import delay from './lib/delay';
// 导入你的数据库查询方法，例如 prisma
// import { db } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      // 1. 定义登录表单需要的字段
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },

      // 2. 核心验证逻辑
      async authorize(credentials) {
        console.log(credentials.email, credentials.password);
        if (!credentials?.email || !credentials?.password) return null;

        await dbConnect();
        await delay(4000);
        const user = await User.findOne({ email: credentials.email });
        if (!user || !user.password) {
          console.log('不存在用户或密码');
          return null;
        }

        // 验证密码是否匹配
        const isPasswordCorrect = await bcrypt.compare(credentials.password as string, user.password);

        if (isPasswordCorrect) {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        }
        console.log('密码错误');
        return null; // 验证失败
      },
    }),
  ],
  pages: {
    signIn: '/signin', // 指定你自定义的登录页面路径
  },
});
