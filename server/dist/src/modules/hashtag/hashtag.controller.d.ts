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
        };
    } & {
        hashtagId: string;
        postId: string;
    })[]>;
}
