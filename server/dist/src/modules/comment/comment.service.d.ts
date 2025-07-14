import { PrismaService } from "@prisma/prisma.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { NotificationService } from "@modules/notification/notification.service";
export declare class CommentService {
    private readonly prisma;
    private readonly notificationService;
    constructor(prisma: PrismaService, notificationService: NotificationService);
    create(userId: string, dto: CreateCommentDto): Promise<{
        author: {
            id: string;
            username: string;
            avatar: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
        postId: string;
    }>;
    findAll(): Promise<({
        post: {
            id: string;
            title: string;
        };
        author: {
            id: string;
            username: string;
            avatar: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
        postId: string;
    })[]>;
    findByPostId(postId: string): Promise<({
        author: {
            id: string;
            username: string;
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
            username: string;
            avatar: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
        postId: string;
    }>;
    update(userId: string, id: string, dto: UpdateCommentDto): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
        postId: string;
    }>;
    remove(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
        postId: string;
    }>;
}
