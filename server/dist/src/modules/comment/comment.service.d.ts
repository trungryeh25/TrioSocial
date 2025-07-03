import { PrismaService } from '@prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, postId: string, dto: CreateCommentDto): Promise<{
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
    findOne(id: string): Promise<{
        post: {
            createdAt: Date;
            id: string;
            updatedAt: Date;
            title: string;
            content: string;
            authorId: string;
        };
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
    }>;
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
