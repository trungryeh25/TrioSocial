import { HashtagService } from './hashtag.service';
export declare class HashtagController {
    private readonly hashtagService;
    constructor(hashtagService: HashtagService);
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        name: string;
    }[]>;
    findPostsByHashtag(name: string): Promise<({
        post: {
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
        };
    } & {
        postId: string;
        hashtagId: string;
    })[]>;
}
