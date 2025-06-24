import { VoteService } from './vote.service';
export declare class VoteController {
    private readonly voteService;
    constructor(voteService: VoteService);
    vote(body: {
        postId: string;
        userId: string;
        value: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        postId: string;
        value: number;
    }>;
    removeVote(body: {
        postId: string;
        userId: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        postId: string;
        value: number;
    }>;
}
