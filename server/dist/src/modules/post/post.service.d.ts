import { PrismaService } from "@prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
export declare class PostService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private normalizeHashtagName;
    create(authorId: string, dto: CreatePostDto): Promise<{
        hashtags: {
            hashtag: {
                id: string;
                createdAt: Date;
                name: string;
            };
        }[];
    } & {
        id: string;
        title: string;
        content: string;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        author: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            username: string;
            password: string;
            bio: string | null;
            role: import(".prisma/client").$Enums.Role;
            avatar: string | null;
        };
        comments: {
            id: string;
            content: string;
            authorId: string;
            createdAt: Date;
            postId: string;
        }[];
        hashtags: {
            hashtag: {
                id: string;
                createdAt: Date;
                name: string;
            };
        }[];
        votes: {
            id: string;
            createdAt: Date;
            postId: string;
            userId: string;
            value: number;
        }[];
    } & {
        id: string;
        title: string;
        content: string;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findById(postId: string): Promise<{
        author: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            username: string;
            password: string;
            bio: string | null;
            role: import(".prisma/client").$Enums.Role;
            avatar: string | null;
        };
        comments: {
            id: string;
            content: string;
            authorId: string;
            createdAt: Date;
            postId: string;
        }[];
        hashtags: {
            hashtag: {
                id: string;
                createdAt: Date;
                name: string;
            };
        }[];
        votes: {
            id: string;
            createdAt: Date;
            postId: string;
            userId: string;
            value: number;
        }[];
    } & {
        id: string;
        title: string;
        content: string;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdatePostDto): Promise<{
        hashtags: {
            hashtag: {
                id: string;
                createdAt: Date;
                name: string;
            };
        }[];
    } & {
        id: string;
        title: string;
        content: string;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        content: string;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getNewFeed(userId: string): Promise<({
        author: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            username: string;
            password: string;
            bio: string | null;
            role: import(".prisma/client").$Enums.Role;
            avatar: string | null;
        };
        comments: {
            id: string;
            content: string;
            authorId: string;
            createdAt: Date;
            postId: string;
        }[];
        hashtags: {
            hashtag: {
                id: string;
                createdAt: Date;
                name: string;
            };
        }[];
        votes: {
            id: string;
            createdAt: Date;
            postId: string;
            userId: string;
            value: number;
        }[];
    } & {
        id: string;
        title: string;
        content: string;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
