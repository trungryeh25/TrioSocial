import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from '@prisma/prisma.module';
import { UserModule } from '@modules/user/user.module';
import { HashtagModule } from '@modules/hashtag/hashtag.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    HashtagModule,
  ],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
