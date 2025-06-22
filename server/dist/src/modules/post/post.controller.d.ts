import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UserEntity } from '@modules/user/entities/user.entity';
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
}
