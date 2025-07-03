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

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: Request, @Body() dto: CreateCommentDto) {
    const user = req.user as any;
    return this.commentService.create(user.id, dto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.commentService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  update(
    @Req() req: Request,
    @Param("id") id: string,
    @Body() dto: UpdateCommentDto
  ) {
    const user = req.user as any;
    return this.commentService.update(user.id, id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Req() req: Request, @Param("id") id: string) {
    const user = req.user as any;
    return this.commentService.remove(user.id, id);
  }
}
