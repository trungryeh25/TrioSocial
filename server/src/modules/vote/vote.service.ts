import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class VoteService {
  constructor(private readonly prisma: PrismaService) {}

  async vote(postId: string, userId: string, value: number) {
    const existingVote = await this.prisma.vote.findUnique({
      where: {
        postId_userId: { postId, userId },
      },
    });

    if (existingVote) {
      return this.prisma.vote.update({
        where: {
          postId_userId: { postId, userId },
        },
        data: {
          value,
        },
      });
    }

    return this.prisma.vote.create({
      data: {
        postId,
        userId,
        value,
      },
    });
  }

  async removeVote(postId: string, userId: string) {
    const vote = await this.prisma.vote.findUnique({
      where: {
        postId_userId: { postId, userId },
      },
    });

    if (!vote) {
      throw new NotFoundException('Vote not found');
    }

    return this.prisma.vote.delete({
      where: {
        postId_userId: { postId, userId },
      },
    });
  }
}
