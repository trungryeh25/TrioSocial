import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { NotificationService } from "@modules/notification/notification.service";

@Injectable()
export class VoteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
  ) {}

  async vote(userId: string, dto: CreateVoteDto) {
    // post exists?
    const post = await this.prisma.post.findUnique({
      where: { id: dto.postId },
      include: {
        author: true,
      },
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
      // Update vote
      const updatedVote = await this.prisma.vote.update({
        where: {
          postId_userId: {
            postId: dto.postId,
            userId: userId,
          },
        },
        data: { value: dto.value },
      });

      return updatedVote;
    } else {
      // Create new vote
      const newVote = await this.prisma.vote.create({
        data: {
          postId: dto.postId,
          userId: userId,
          value: dto.value,
        },
      });

      // Gửi notification cho tác giả bài viết (trừ khi người vote chính là tác giả)
      if (userId !== post.author.id) {
        await this.notificationService.create({
          type: "vote",
          message: `Your post "${post.title}" got a new vote!`,
          recipientId: post.author.id,
          userId: userId,
        });
      }

      return newVote;
    }
  }

  async removeVote(userId: string, postId: string) {
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
