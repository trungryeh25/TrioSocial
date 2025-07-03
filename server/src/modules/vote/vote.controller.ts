import { Controller, Post, Body, UseGuards, Delete, Query } from "@nestjs/common";
import { VoteService } from "./vote.service";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { JwtAuthGuard } from "@common/guards/jwt-auth.guard";
import { CurrentUser } from "@common/decorators/current-user.decorator";
import { AuthPayload } from "@common/interfaces/auth-payload.interface";

@Controller("vote")
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async vote(@Body() dto: CreateVoteDto, @CurrentUser() user: AuthPayload) {
    return this.voteService.vote(user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async removeVote(
    @Query("postId") postId: string,
    @CurrentUser() user: AuthPayload
  ) {
    return this.voteService.removeVote(user.sub, postId);
  }
}
