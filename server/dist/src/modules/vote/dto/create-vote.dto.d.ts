export declare enum VoteType {
    UPVOTE = "UPVOTE",
    DOWNVOTE = "DOWNVOTE"
}
export declare class CreateVoteDto {
    postId: string;
    value: number;
}
