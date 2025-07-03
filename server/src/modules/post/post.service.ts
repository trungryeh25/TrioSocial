import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  private normalizeHashtagName(name: string) {
    return name.trim().toLowerCase();
  }

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
                where: { name: this.normalizeHashtagName(name) },
                create: { name: this.normalizeHashtagName(name) },
              },
            },
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

  async findById(postId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: true,
        hashtags: { select: { hashtag: true } },
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
    await this.findById(id);

    return this.prisma.post.update({
      where: { id },
      data: {
        title: dto.title,
        content: dto.content,
        updatedAt: new Date(),
        hashtags: dto.hashtags
          ? {
              deleteMany: {}, // reset all of hashtags before
              create: dto.hashtags.map((name) => ({
                hashtag: {
                  connectOrCreate: {
                    where: { name: this.normalizeHashtagName(name) },
                    create: { name: this.normalizeHashtagName(name) },
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
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.post.delete({ where: { id } });
  }
}
