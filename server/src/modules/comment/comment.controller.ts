import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { JwtAuthGuard } from "@common/guards/jwt-auth.guard";
import { Request } from "express";

@Controller("comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: Request, @Body() dto: CreateCommentDto) {
    const user = req.user as any;
    const userId = user.sub || user.id; // fallback
    return this.commentService.create(userId, dto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get("/post/:postId")
  findByPost(@Param("postId") postId: string) {
    return this.commentService.findByPostId(postId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.commentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    @Req() req: Request,
    @Param("id") id: string,
    @Body() dto: UpdateCommentDto
  ) {
    const user = req.user as any;
    const userId = user.sub || user.id;
    return this.commentService.update(userId, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Req() req: Request, @Param("id") id: string) {
    const user = req.user as any;
    const userId = user.sub || user.id;
    return this.commentService.remove(userId, id);
  }
}
