import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from "@nestjs/common";

import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { JwtAuthGuard } from "@common/guards/jwt-auth.guard";
import { CurrentUser } from "@common/decorators/current-user.decorator";
import { UserEntity } from "@common/entities/user.entity";

@UseGuards(JwtAuthGuard)
@Controller("comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(":postId")
  create(
    @Param("postId") postId: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: CreateCommentDto
  ) {
    return this.commentService.create(user.id, postId, dto);
  }

  @Get("post/:postId")
  findAllByPost(@Param("postId") postId: string) {
    return this.commentService.findAllByPost(postId);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateCommentDto) {
    return this.commentService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.commentService.remove(id);
  }
}
