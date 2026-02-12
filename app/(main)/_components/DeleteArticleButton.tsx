'use client';

import { deleteArticle } from '@/actions/articleActions';
import { Button } from '@/components/ui/button';

const DeleteArticleButton = ({ id }: { id: string }) => {
  const handleDelete = async () => {
    if (confirm('确认删除该篇文章吗？')) {
      await deleteArticle(id);
    }
  };
  return (
    <Button variant={'destructive'} onClick={handleDelete}>
      删除文章
    </Button>
  );
};

export default DeleteArticleButton;
