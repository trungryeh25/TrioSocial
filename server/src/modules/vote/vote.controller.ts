import { Controller, Post, Delete, Body } from '@nestjs/common';
import { VoteService } from './vote.service';

@Controller('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  vote(
    @Body() body: { postId: string; userId: string; value: number }
  ) {
    const { postId, userId, value } = body;
    return this.voteService.vote(postId, userId, value);
  }

  @Delete()
  removeVote(
    @Body() body: { postId: string; userId: string }
  ) {
    const { postId, userId } = body;
    return this.voteService.removeVote(postId, userId);
  }
}
