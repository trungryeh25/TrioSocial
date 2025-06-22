import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { UserEntity } from '@modules/user/entities/user.entity';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(
    @CurrentUser() user: UserEntity,
    @Body() dto: CreatePostDto
  ) {
    return this.postService.create(user.id, dto);
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.postService.findById(id);
  }

  @Get()
  async getAllPosts() {
    return this.postService.findAll();
  }
}
