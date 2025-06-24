import { Controller, Get, Patch, Body, UseGuards } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { UserEntity } from "@modules/user/entities/user.entity";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@CurrentUser() user: UserEntity) {
    return this.profileService.getProfile(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateProfile(
    @CurrentUser() user: UserEntity,
    @Body() dto: UpdateProfileDto
  ) {
    return this.profileService.updateProfile(user.id, dto);
  }
}
