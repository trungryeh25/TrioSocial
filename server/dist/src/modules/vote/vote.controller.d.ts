import { VoteService } from './vote.service';
export declare class VoteController {
    private readonly voteService;
    constructor(voteService: VoteService);
    vote(body: {
        postId: string;
        userId: string;
        value: number;
    }): Promise<{
        createdAt: Date;
        id: string;
        userId: string;
        postId: string;
        value: number;
    }>;
    removeVote(body: {
        postId: string;
        userId: string;
    }): Promise<{
        createdAt: Date;
        id: string;
        userId: string;
        postId: string;
        value: number;
    }>;
}
