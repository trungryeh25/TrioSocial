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
        };
    } & {
        hashtagId: string;
        postId: string;
    })[]>;
}
