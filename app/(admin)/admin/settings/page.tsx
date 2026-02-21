import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import User from '@/models/User';
import dbConnect from '@/lib/db';
import { revalidatePath } from 'next/cache';

export default async function Settings() {
  const session = await auth();
  if (!session) redirect('/login');

  await dbConnect();
  const user = await User.findOne(session.user);
  if (!user) throw new Error('something wrong!');

  async function settingAction(formData: FormData) {
    'use server';
    // 1. 在 Action 内部重新验证 Session
    const session = await auth();
    if (!session?.user?.email) return;

    await dbConnect();

    // 2. 获取最新的用户文档
    const dbUser = await User.findOne({ email: session.user.email });
    if (!dbUser) return;

    // 如果 settings 不存在，就初始化为一个空对象
    if (!dbUser.settings) {
      dbUser.settings = { problemLimit: 10, articleLimit: 10 };
    }

    dbUser.settings.problemLimit = Number(formData.get('problemPageLimit'));
    dbUser.settings.articleLimit = Number(formData.get('articlePageLimit'));
    await dbUser.save();

    // 4. 告诉 Next.js 页面数据过期了，需要刷新
    revalidatePath('/settings');
  }

  return (
    <div className="py-4 px-4">
      <form action={settingAction}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>个人设置</CardTitle>
            <CardDescription>个人信息，网页显示相关</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="problemPageLimit">题库每页数量</Label>
                <Input
                  id="problemPageLimit"
                  type="number"
                  name="problemPageLimit"
                  defaultValue={user.settings ? user.settings.problemLimit : 10}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="articlePageLimit">文章每页数量</Label>
                </div>
                <Input
                  id="articlePageLimit"
                  name="articlePageLimit"
                  type="number"
                  defaultValue={user.settings ? user.settings.articleLimit : 10}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="">
            <Button type="submit" className="">
              确定
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
