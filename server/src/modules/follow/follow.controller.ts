import {
  Controller,
  Param,
  Post,
  Delete,
  Get,
  UseGuards,
} from "@nestjs/common";
import { FollowService } from "./follow.service";
import { JwtAuthGuard } from "common/guards/jwt-auth.guard";
import { CurrentUser } from "common/decorators/current-user.decorator";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post(":id/follow")
  follow(@CurrentUser("id") userId: string, @Param("id") targetId: string) {
    return this.followService.follow(userId, targetId);
  }

  @Delete(":id/follow")
  unfollow(@CurrentUser("id") userId: string, @Param("id") targetId: string) {
    return this.followService.unfollow(userId, targetId);
  }

  @Get(":id/following")
  getFollowing(@Param("id") userId: string) {
    return this.followService.getFollowing(userId);
  }
}
