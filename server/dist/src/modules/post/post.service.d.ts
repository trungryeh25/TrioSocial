import { PrismaService } from '@prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: string;
        title: string;
    }>;
    findAll(): Promise<({
        comments: {
            id: string;
            createdAt: Date;
            content: string;
            postId: string;
            authorId: string;
        }[];
        votes: {
            id: string;
            createdAt: Date;
            userId: string;
            postId: string;
            value: number;
        }[];
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
        hashtags: {
            hashtag: {
                id: string;
                createdAt: Date;
                name: string;
            };
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: string;
        title: string;
    })[]>;
    findOne(id: string): Promise<{
        comments: {
            id: string;
            createdAt: Date;
            content: string;
            postId: string;
            authorId: string;
        }[];
        votes: {
            id: string;
            createdAt: Date;
            userId: string;
            postId: string;
            value: number;
        }[];
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
        hashtags: {
            hashtag: {
                id: string;
                createdAt: Date;
                name: string;
            };
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: string;
        title: string;
    }>;
    findById(postId: string): Promise<{
        comments: {
            id: string;
            createdAt: Date;
            content: string;
            postId: string;
            authorId: string;
        }[];
        votes: {
            id: string;
            createdAt: Date;
            userId: string;
            postId: string;
            value: number;
        }[];
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
        hashtags: ({
            hashtag: {
                id: string;
                createdAt: Date;
                name: string;
            };
        } & {
            postId: string;
            hashtagId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: string;
        title: string;
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
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: string;
        title: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: string;
        title: string;
    }>;
}
