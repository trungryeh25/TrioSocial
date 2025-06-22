import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UserEntity } from '@modules/user/entities/user.entity';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(postId: string, user: UserEntity, dto: CreateCommentDto): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
        postId: string;
    }>;
    findAllByPost(postId: string): Promise<({
        author: {
            id: string;
            email: string;
            username: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
            bio: string | null;
            avatar: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
        postId: string;
    })[]>;
    update(id: string, dto: UpdateCommentDto): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
        postId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
        postId: string;
    }>;
}
