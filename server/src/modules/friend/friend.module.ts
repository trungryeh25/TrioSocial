import { Module } from "@nestjs/common";
import { FriendService } from "./friend.service";
import { FriendController } from "./friend.controller";
import { PrismaModule } from "prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [FriendService],
  controllers: [FriendController],
})
export class FriendModule {}
