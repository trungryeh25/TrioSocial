import { VoteService } from "./vote.service";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { AuthPayload } from "@common/interfaces/auth-payload.interface";
export declare class VoteController {
    private readonly voteService;
    constructor(voteService: VoteService);
    vote(dto: CreateVoteDto, user: AuthPayload): Promise<{
        id: string;
        createdAt: Date;
        postId: string;
        userId: string;
        value: number;
    }>;
    removeVote(postId: string, user: AuthPayload): Promise<{
        id: string;
        createdAt: Date;
        postId: string;
        userId: string;
        value: number;
    }>;
}
