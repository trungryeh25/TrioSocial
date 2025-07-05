import { Module } from "@nestjs/common";
import { VoteService } from "./vote.service";
import { VoteController } from "./vote.controller";
import { PrismaService } from "@prisma/prisma.service";
import { NotificationModule } from "@modules/notification/notification.module";

@Module({
  imports: [NotificationModule],
  controllers: [VoteController],
  providers: [VoteService, PrismaService],
})
export class VoteModule {}
