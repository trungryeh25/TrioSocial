import {
  Controller,
  Post as HttpPost,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  UseGuards,
  ForbiddenException,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { JwtAuthGuard } from "@common/guards/jwt-auth.guard";
import { CurrentUser } from "@common/decorators/current-user.decorator";
import { UserEntity } from "@common/entities/user.entity";

@Controller("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @HttpPost()
  async createPost(
    @CurrentUser() user: UserEntity,
    @Body() dto: CreatePostDto
  ) {
    return this.postService.create(user.id, dto);
  }

  @Get()
  async getAllPosts() {
    return this.postService.findAll();
  }

  @Get(":id")
  async getPostById(@Param("id") id: string) {
    return this.postService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async updatePost(
    @Param("id") id: string,
    @CurrentUser() user: UserEntity,
    @Body() dto: UpdatePostDto
  ) {
    const post = await this.postService.findById(id);
    if (post.authorId !== user.id) {
      throw new ForbiddenException("You can only update your own post");
    }
    return this.postService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deletePost(@Param("id") id: string, @CurrentUser() user: UserEntity) {
    const post = await this.postService.findById(id);
    if (post.authorId !== user.id) {
      throw new ForbiddenException("You can only delete your own post");
    }
    return this.postService.remove(id);
  }
}
