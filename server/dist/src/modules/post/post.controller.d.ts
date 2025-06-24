import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UserEntity } from "@modules/user/entities/user.entity";
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
        content: string;
        authorId: string;
        title: string;
    }>;
    getPostById(id: string): Promise<{
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
    getAllPosts(): Promise<({
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
}
