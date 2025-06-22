import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

export enum VoteType {
  UPVOTE = 'UPVOTE',
  DOWNVOTE = 'DOWNVOTE',
}

export class CreateVoteDto {
  @IsUUID()
  userId!: string;

  @IsUUID()
  postId!: string;

  @IsEnum(VoteType)
  type!: VoteType;
}
