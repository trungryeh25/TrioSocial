import { PrismaService } from '@prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(authorId: string, dto: CreatePostDto): Promise<{
        hashtags: {
            hashtag: {
                createdAt: Date;
                name: string;
                id: string;
            };
        }[];
    } & {
        createdAt: Date;
        id: string;
        updatedAt: Date;
        title: string;
        content: string;
        authorId: string;
    }>;
    findAll(): Promise<({
        comments: {
            createdAt: Date;
            id: string;
            content: string;
            authorId: string;
            postId: string;
        }[];
        votes: {
            createdAt: Date;
            id: string;
            userId: string;
            postId: string;
            value: number;
        }[];
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
        hashtags: {
            hashtag: {
                createdAt: Date;
                name: string;
                id: string;
            };
        }[];
    } & {
        createdAt: Date;
        id: string;
        updatedAt: Date;
        title: string;
        content: string;
        authorId: string;
    })[]>;
    findOne(id: string): Promise<{
        comments: {
            createdAt: Date;
            id: string;
            content: string;
            authorId: string;
            postId: string;
        }[];
        votes: {
            createdAt: Date;
            id: string;
            userId: string;
            postId: string;
            value: number;
        }[];
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
        hashtags: {
            hashtag: {
                createdAt: Date;
                name: string;
                id: string;
            };
        }[];
    } & {
        createdAt: Date;
        id: string;
        updatedAt: Date;
        title: string;
        content: string;
        authorId: string;
    }>;
    findById(postId: string): Promise<{
        comments: {
            createdAt: Date;
            id: string;
            content: string;
            authorId: string;
            postId: string;
        }[];
        votes: {
            createdAt: Date;
            id: string;
            userId: string;
            postId: string;
            value: number;
        }[];
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
        hashtags: ({
            hashtag: {
                createdAt: Date;
                name: string;
                id: string;
            };
        } & {
            hashtagId: string;
            postId: string;
        })[];
    } & {
        createdAt: Date;
        id: string;
        updatedAt: Date;
        title: string;
        content: string;
        authorId: string;
    }>;
    update(id: string, dto: UpdatePostDto): Promise<{
        hashtags: {
            hashtag: {
                createdAt: Date;
                name: string;
                id: string;
            };
        }[];
    } & {
        createdAt: Date;
        id: string;
        updatedAt: Date;
        title: string;
        content: string;
        authorId: string;
    }>;
    remove(id: string): Promise<{
        createdAt: Date;
        id: string;
        updatedAt: Date;
        title: string;
        content: string;
        authorId: string;
    }>;
}
