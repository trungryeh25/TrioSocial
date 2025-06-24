import { PrismaService } from '@prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, postId: string, dto: CreateCommentDto): Promise<{
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
    findOne(id: string): Promise<{
        post: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            authorId: string;
            title: string;
        };
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
    }>;
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
