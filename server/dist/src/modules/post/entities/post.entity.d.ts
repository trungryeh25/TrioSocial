import { Comment } from '@comment/entities/comment.entity';
import { UserEntity } from '@user/entities/user.entity';
import { Hashtag } from '@hashtag/entities/hashtag.entity';
export declare class Post {
    id: string;
    title: string;
    content: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    author?: UserEntity;
    comments?: Comment[];
    hashtags?: Hashtag[];
}
