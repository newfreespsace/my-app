import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import { Textarea } from "@/components/ui/textarea";
import Article from "@/models/Article";
import dbConnect from "@/lib/db";
import { revalidatePath } from "next/cache";
import Link from "next/link";

import ArticleListTable from "@/components/ArticleListTable";

export default async function Page() {
  async function createInvoice(formData: FormData) {
    "use server";

    await dbConnect();
    console.log("aa");
    const rawFormData = {
      content: formData.get("content"),
    };

    const article = await Article.create(rawFormData);
    revalidatePath("/");

    console.log(article);
  }

  await dbConnect();
  const rawArticles = await Article.find();
  // 关键步骤：转换
  const articles = JSON.parse(JSON.stringify(rawArticles));

  return (
    <>
      <ArticleListTable articles={articles} />
      <p>{process.env.MONGODB_URI}</p>
      <div>
        {articles.map((a) => (
          <Link key={a._id} href={`articles/${a._id}`}>
            <p>{a.content}</p>
          </Link>
        ))}
      </div>
      <p>----------------------</p>
      <div className="w-full max-w-md">
        <form action={createInvoice}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="content">正文</FieldLabel>
              <Textarea
                id="content"
                name="content"
                placeholder=""
                className="resize-none"
              />
            </Field>
            <Field orientation="horizontal">
              <Button type="submit">Submit</Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </>
  );
}
