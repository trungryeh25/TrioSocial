import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@prisma/prisma.module';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@user/user.module';
import { PostModule } from '@post/post.module';
import { CommentModule } from '@comment/comment.module';
import { VoteModule } from '@vote/vote.module';
import { HashtagModule } from '@hashtag/hashtag.module';
import { NotificationModule } from '@notification/notification.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
        AuthModule,
        UserModule,
        PostModule,
        CommentModule,
        VoteModule,
        HashtagModule,
        NotificationModule,
    ],
})

export class AppModule {}