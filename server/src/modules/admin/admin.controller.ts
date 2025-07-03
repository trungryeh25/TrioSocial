import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@common/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles } from "@common/decorators/roles.decorator";

@Controller("admin")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  @Get("dashboard")
  @Roles("ADMIN")
  getDashboard() {
    return {
      message: "Welcome admin!",
    };
  }
}
