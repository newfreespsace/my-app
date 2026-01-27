import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import { Textarea } from "@/components/ui/textarea";
import Article from "@/models/Article";
import dbConnect from "@/lib/db";
import { revalidatePath } from "next/cache";

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
  const articles = await Article.find();

  return (
    <>
      <p>{process.env.MONGODB_URI}</p>
      <div>
        {articles.map((a) => (
          <p key={a._id}>{a.content}</p>
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
