import { CommentEntity } from "@common/entities/comment.entity";
import { UserEntity } from "@common/entities/user.entity";
import { Hashtag } from "@common/entities/hashtag.entity";
export declare class Post {
    id: string;
    title: string;
    content: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    author?: UserEntity;
    comments?: CommentEntity[];
    hashtags?: Hashtag[];
}
