import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { UserEntity } from "@modules/user/entities/user.entity";
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(postId: string, user: UserEntity, dto: CreateCommentDto): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        postId: string;
        authorId: string;
    }>;
    findAllByPost(postId: string): Promise<({
        author: {
            id: string;
            email: string;
            username: string;
            password: string;
            bio: string | null;
            role: import(".prisma/client").$Enums.Role;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        content: string;
        postId: string;
        authorId: string;
    })[]>;
    update(id: string, dto: UpdateCommentDto): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        postId: string;
        authorId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        postId: string;
        authorId: string;
    }>;
}
