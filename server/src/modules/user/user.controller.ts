import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  Delete,
  UseGuards,
  ForbiddenException,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Roles } from "@common/decorators/roles.decorator";
import { RolesGuard } from "@common/guards/roles.guard";
import { FriendService } from "@modules/friend/friend.service";
import { CurrentUser } from "@common/decorators/current-user.decorator";
import { UserEntity } from "@common/entities/user.entity";

@Controller("users")
@UseGuards(RolesGuard)
@Roles("USER")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly friendService: FriendService
  ) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.userService.findByIdOrThrow(id);
  }

  @Get(":id/friends")
  async getFriendsOfUser(@Param("id") id: string) {
    return this.friendService.getFriendsOfUser(id);
  }

  @Patch(":id")
  async updateUser(
    @Param("id") id: string,
    @Body() dto: UpdateUserDto,
    @CurrentUser() currentUser: UserEntity
  ) {
    if (currentUser.id !== id && currentUser.role !== "ADMIN") {
      throw new ForbiddenException("You can only update your own account");
    }
    return this.userService.update(id, dto);
  }

  @Delete(":id")
  async deleteUser(
    @Param("id") id: string,
    @CurrentUser() currentUser: UserEntity
  ) {
    if (currentUser.id !== id && currentUser.role !== "ADMIN") {
      throw new ForbiddenException("You can only delete your own account");
    }
    return this.userService.remove(id);
  }
}
