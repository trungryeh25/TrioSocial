import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { FollowService } from "./follow.service";
import { FollowController } from "./follow.controller";

@Module({
  imports: [PrismaModule],
  providers: [FollowService],
  controllers: [FollowController],
})
export class FollowModule {}
