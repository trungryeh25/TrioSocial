// import { Comment } from '@prisma/client';

export class Comment {
  id!: string;
  content!: string;
  postId!: string;
  userId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
