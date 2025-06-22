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
    findOne(id: string): Promise<{
        post: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            content: string;
            authorId: string;
        };
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
    }>;
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
