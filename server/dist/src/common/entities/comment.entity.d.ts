export interface CommentEntity {
    id: string;
    content: string;
    postId: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
}
