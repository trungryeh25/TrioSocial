import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class HashtagService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.hashtag.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findPostsByHashtag(name: string) {
    return this.prisma.postHashtag.findMany({
      where: { hashtag: { name } },
      include: {
        post: {
          include: {
            author: true,
            hashtags: { select: { hashtag: true } },
            comments: true,
            votes: true,
          },
        },
      },
    });
  }
}
