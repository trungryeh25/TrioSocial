export declare enum VoteType {
    UPVOTE = "UPVOTE",
    DOWNVOTE = "DOWNVOTE"
}
export declare class CreateVoteDto {
    userId: string;
    postId: string;
    type: VoteType;
}
