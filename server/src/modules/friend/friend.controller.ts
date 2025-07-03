import {
  Controller,
  Post,
  Param,
  Body,
  UseGuards,
  Delete,
  Patch,
  Get,
} from "@nestjs/common";
import { FriendService } from "./friend.service";
import { JwtAuthGuard } from "common/guards/jwt-auth.guard";
import { CurrentUser } from "common/decorators/current-user.decorator";
import { CreateFriendDto } from "./dto/create-friend.dto";

@Controller("friends")
@UseGuards(JwtAuthGuard)
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post()
  sendRequest(@CurrentUser("id") userId: string, @Body() dto: CreateFriendDto) {
    return this.friendService.sendRequest(userId, dto);
  }

  @Patch(":friendId/accept")
  acceptRequest(
    @CurrentUser("id") userId: string,
    @Param("friendId") friendId: string
  ) {
    return this.friendService.acceptRequest(userId, friendId);
  }

  @Delete(":friendId")
  removeFriend(
    @CurrentUser("id") userId: string,
    @Param("friendId") friendId: string
  ) {
    return this.friendService.removeFriend(userId, friendId);
  }

  // @Get("me")
  // getFriends(@CurrentUser("id") userId: string) {
  //   return this.friendService.getFriends(userId);
  // }

  @UseGuards(JwtAuthGuard)
  @Get(":id/friends")
  getFriends(@Param("id") id: string) {
    return this.friendService.getFriendsOfUser(id);
  }

  @Get("pending")
  getPending(@CurrentUser("id") userId: string) {
    return this.friendService.getPendingRequests(userId);
  }

  @Delete(":friendId/cancel")
  cancelRequest(
    @CurrentUser("id") userId: string,
    @Param("friendId") friendId: string
  ) {
    return this.friendService.cancelRequest(userId, friendId);
  }
}
