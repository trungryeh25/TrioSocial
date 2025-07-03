import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
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
        title: string;
        content: string;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getPostById(id: string): Promise<{
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
    getAllPosts(): Promise<({
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
