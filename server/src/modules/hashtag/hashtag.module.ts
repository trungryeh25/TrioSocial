import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './hashtag.controller';
import { PrismaService } from '@prisma/prisma.service';

@Module({
  providers: [HashtagService, PrismaService],
  controllers: [HashtagController]
})
export class HashtagModule {}
