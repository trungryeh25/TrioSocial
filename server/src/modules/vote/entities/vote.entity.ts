import { VoteType } from '../dto/create-vote.dto';

export class Vote {
  id!: string;
  userId!: string;
  postId!: string;
  type!: VoteType;
  createdAt!: Date;
}
