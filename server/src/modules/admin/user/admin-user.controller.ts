import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  Delete,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AdminUserService } from "./admin-user.service";
import { AdminCreateUserDto } from "./dto/admin-create-user.dto";
import { AdminUpdateUserDto } from "./dto/admin-update-user.dto";
import { RolesGuard } from "common/guards/roles.guard";
import { Roles } from "../../../common/decorators/roles.decorator";

@Controller("admin/users")
@UseGuards(RolesGuard)
@Roles("ADMIN")
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Get()
  async findAll() {
    return this.adminUserService.findAll();
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.adminUserService.findByIdOrThrow(id);
  }

  @Post()
  async create(@Body() dto: AdminCreateUserDto) {
    return this.adminUserService.create(dto);
  }

  @Patch(":id")
  async updateUser(@Param("id") id: string, @Body() dto: AdminUpdateUserDto) {
    return this.adminUserService.update(id, dto);
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    return this.adminUserService.remove(id);
  }
}
