import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UserEntity } from "@modules/user/entities/user.entity";
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    createPost(user: UserEntity, dto: CreatePostDto): Promise<{
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
    getPostById(id: string): Promise<{
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
    getAllPosts(): Promise<({
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
}
