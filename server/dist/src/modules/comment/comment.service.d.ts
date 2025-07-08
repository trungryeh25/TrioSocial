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
        content: string;
        postId: string;
        authorId: string;
        createdAt: Date;
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
        content: string;
        postId: string;
        authorId: string;
        createdAt: Date;
    })[]>;
    findByPostId(postId: string): Promise<({
        author: {
            id: string;
            username: string;
            avatar: string | null;
        };
    } & {
        id: string;
        content: string;
        postId: string;
        authorId: string;
        createdAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        post: {
            id: string;
            content: string;
            authorId: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
        };
        author: {
            id: string;
            username: string;
            avatar: string | null;
        };
    } & {
        id: string;
        content: string;
        postId: string;
        authorId: string;
        createdAt: Date;
    }>;
    update(userId: string, id: string, dto: UpdateCommentDto): Promise<{
        id: string;
        content: string;
        postId: string;
        authorId: string;
        createdAt: Date;
    }>;
    remove(userId: string, id: string): Promise<{
        id: string;
        content: string;
        postId: string;
        authorId: string;
        createdAt: Date;
    }>;
}
