import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { UserEntity } from "@modules/user/entities/user.entity";
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(postId: string, user: UserEntity, dto: CreateCommentDto): Promise<{
        createdAt: Date;
        id: string;
        content: string;
        authorId: string;
        postId: string;
    }>;
    findAllByPost(postId: string): Promise<({
        author: {
            createdAt: Date;
            id: string;
            email: string;
            username: string;
            password: string;
            bio: string | null;
            role: import(".prisma/client").$Enums.Role;
            avatar: string | null;
            updatedAt: Date;
        };
    } & {
        createdAt: Date;
        id: string;
        content: string;
        authorId: string;
        postId: string;
    })[]>;
    update(id: string, dto: UpdateCommentDto): Promise<{
        createdAt: Date;
        id: string;
        content: string;
        authorId: string;
        postId: string;
    }>;
    remove(id: string): Promise<{
        createdAt: Date;
        id: string;
        content: string;
        authorId: string;
        postId: string;
    }>;
}
