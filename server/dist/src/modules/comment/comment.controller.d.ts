import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { UserEntity } from "@common/entities/user.entity";
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(postId: string, user: UserEntity, dto: CreateCommentDto): Promise<{
        id: string;
        content: string;
        postId: string;
        authorId: string;
        createdAt: Date;
    }>;
    findAllByPost(postId: string): Promise<({
        author: {
            id: string;
            createdAt: Date;
            email: string;
            username: string;
            password: string;
            bio: string | null;
            role: import(".prisma/client").$Enums.Role;
            avatar: string | null;
            updatedAt: Date;
        };
    } & {
        id: string;
        content: string;
        postId: string;
        authorId: string;
        createdAt: Date;
    })[]>;
    update(id: string, dto: UpdateCommentDto): Promise<{
        id: string;
        content: string;
        postId: string;
        authorId: string;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        content: string;
        postId: string;
        authorId: string;
        createdAt: Date;
    }>;
}
