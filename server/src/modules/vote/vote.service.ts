import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { CreateVoteDto } from "./dto/create-vote.dto";

@Injectable()
export class VoteService {
  constructor(private readonly prisma: PrismaService) {}

  async vote(userId: string, dto: CreateVoteDto) {
    // post exists?
    const post = await this.prisma.post.findUnique({
      where: { id: dto.postId },
    });
    if (!post) throw new NotFoundException("Post not found");

    // vote exist?
    const existingVote = await this.prisma.vote.findUnique({
      where: {
        postId_userId: {
          postId: dto.postId,
          userId: userId,
        },
      },
    });

    if (existingVote) {
      // if it existed, could update
      return this.prisma.vote.update({
        where: {
          postId_userId: {
            postId: dto.postId,
            userId: userId,
          },
        },
        data: { value: dto.value },
      });
    } else {
      // if it wasn't exist, could create
      return this.prisma.vote.create({
        data: {
          postId: dto.postId,
          userId: userId,
          value: dto.value,
        },
      });
    }
  }

  async removeVote(userId: string, postId: string) {
    // vote exist?
    const vote = await this.prisma.vote.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (!vote) throw new NotFoundException("Vote not found");

    return this.prisma.vote.delete({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });
  }
}
