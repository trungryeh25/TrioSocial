import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { PrismaModule } from "@prisma/prisma.module";
import { PostModule } from "@modules/post/post.module";
import { UserModule } from "@modules/user/user.module";
import { NotificationModule } from "@modules/notification/notification.module";

@Module({
  imports: [PrismaModule, PostModule, UserModule, NotificationModule],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}

// import { Module } from "@nestjs/common";
// import { CommentService } from "./comment.service";
// import { CommentController } from "./comment.controller";
// import { PrismaService } from "@prisma/prisma.service";

// @Module({
//   controllers: [CommentController],
//   providers: [CommentService, PrismaService],
// })
// export class CommentModule {}
