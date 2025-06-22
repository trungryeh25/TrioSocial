import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { PrismaService } from '@prisma/prisma.service';

@Module({
  providers: [VoteService, PrismaService],
  controllers: [VoteController]
})
export class VoteModule {}
