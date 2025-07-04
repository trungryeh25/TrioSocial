import { HashtagService } from './hashtag.service';
export declare class HashtagController {
    private readonly hashtagService;
    constructor(hashtagService: HashtagService);
    findAll(): Promise<{
        createdAt: Date;
        name: string;
        id: string;
    }[]>;
    findPostsByHashtag(name: string): Promise<({
        post: {
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
        };
    } & {
        hashtagId: string;
        postId: string;
    })[]>;
}
