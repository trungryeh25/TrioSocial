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
        title: string;
        content: string;
        authorId: string;
    }>;
    findAll(): Promise<({
        comments: {
            id: string;
            createdAt: Date;
            content: string;
            authorId: string;
            postId: string;
        }[];
        votes: {
            id: string;
            createdAt: Date;
            postId: string;
            userId: string;
            value: number;
        }[];
        hashtags: {
            hashtag: {
                id: string;
                createdAt: Date;
                name: string;
            };
        }[];
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
        updatedAt: Date;
        title: string;
        content: string;
        authorId: string;
    })[]>;
    findOne(id: string): Promise<{
        comments: {
            id: string;
            createdAt: Date;
            content: string;
            authorId: string;
            postId: string;
        }[];
        votes: {
            id: string;
            createdAt: Date;
            postId: string;
            userId: string;
            value: number;
        }[];
        hashtags: {
            hashtag: {
                id: string;
                createdAt: Date;
                name: string;
            };
        }[];
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
        updatedAt: Date;
        title: string;
        content: string;
        authorId: string;
    }>;
    findById(postId: string): Promise<{
        comments: {
            id: string;
            createdAt: Date;
            content: string;
            authorId: string;
            postId: string;
        }[];
        votes: {
            id: string;
            createdAt: Date;
            postId: string;
            userId: string;
            value: number;
        }[];
        hashtags: ({
            hashtag: {
                id: string;
                createdAt: Date;
                name: string;
            };
        } & {
            hashtagId: string;
            postId: string;
        })[];
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
        updatedAt: Date;
        title: string;
        content: string;
        authorId: string;
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
        title: string;
        content: string;
        authorId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        authorId: string;
    }>;
}
