import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { UserEntity } from "@common/entities/user.entity";
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    createPost(user: UserEntity, dto: CreatePostDto): Promise<{
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
    getAllPosts(): Promise<({
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
        title: string;
        content: string;
        authorId: string;
    })[]>;
    getNewFeed(user: UserEntity): Promise<({
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
        title: string;
        content: string;
        authorId: string;
    })[]>;
    getPostById(id: string): Promise<{
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
        title: string;
        content: string;
        authorId: string;
    }>;
    updatePost(id: string, user: UserEntity, dto: UpdatePostDto): Promise<{
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
    deletePost(id: string, user: UserEntity): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        authorId: string;
    }>;
}
