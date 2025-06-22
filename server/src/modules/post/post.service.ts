import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(authorId: string, dto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        title: dto.title,
        content: dto.content,
        authorId,
        hashtags: {
          create: dto.hashtags?.map((name) => ({
            hashtag: {
                connectOrCreate: {
                    where: { name },
                    create: { name },
                }
            }
            
          })) || [],
        },
      },
      include: {
        hashtags: { select: { hashtag: true } },
      },
    });
  }

  async findAll() {
    return this.prisma.post.findMany({
      include: {
        author: true,
        hashtags: { select: { hashtag: true } },
        votes: true,
        comments: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        hashtags: { select: { hashtag: true } },
        comments: true,
        votes: true,
      },
    });

    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async findById(postId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: true,
        hashtags: { include: { hashtag: true } },
        comments: true,
        votes: true,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async update(id: string, dto: UpdatePostDto) {
    await this.findOne(id);

    const updatedPost = await this.prisma.post.update({
        where: { id },
        data: {
        title: dto.title,
        content: dto.content,
        updatedAt: new Date(),
        hashtags: dto.hashtags
            ? {
                deleteMany: {}, // Remove all of the current hashtags
                create: dto.hashtags.map((name) => ({
                hashtag: {
                    connectOrCreate: {
                    where: { name: name.trim().toLowerCase() },
                    create: { name: name.trim().toLowerCase() },
                    },
                },
                })),
            }
            : undefined,
        },
        include: {
        hashtags: { select: { hashtag: true } },
        },
    });

    return updatedPost;
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.post.delete({ where: { id } });
  }
}
