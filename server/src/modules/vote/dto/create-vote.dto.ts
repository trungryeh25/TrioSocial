// export class CreateVoteDto {
//   @IsUUID()
//   userId!: string;

//   @IsUUID()
//   postId!: string;

//   @IsEnum(VoteType)
//   type!: VoteType;
// }
import { IsInt, IsIn, IsNotEmpty, IsEnum, IsUUID } from "class-validator";

export enum VoteType {
  UPVOTE = 'UPVOTE',
  DOWNVOTE = 'DOWNVOTE',
}

export class CreateVoteDto {
  @IsNotEmpty()
  postId!: string;

  @IsInt()
  @IsIn([1, -1])
  value!: number;
}
