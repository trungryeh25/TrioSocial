import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { NotificationService } from "@modules/notification/notification.service";

@Injectable()
export class CommentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService
  ) {}

  async create(userId: string, dto: CreateCommentDto) {
    const post = await this.prisma.post.findUnique({
      where: { id: dto.postId! },
      include: { author: true },
    });

    if (!post) throw new NotFoundException("Post not found");

    const comment = await this.prisma.comment.create({
      data: {
        content: dto.content!,
        postId: dto.postId!,
        authorId: userId,
      },
    });

    // Nếu author của post khác người comment thì gửi notification
    if (post.author.id !== userId) {
      await this.notificationService.create({
        type: "comment",
        message: `Your post "${post.title}" has a new comment!`,
        recipientId: post.author.id,
        userId,
        actionId: comment.id,
      });
    }

    return comment;
  }

  async findAll() {
    return this.prisma.comment.findMany({
      include: {
        author: {
          select: { id: true, username: true, avatar: true },
        },
        post: {
          select: { id: true, title: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findOne(id: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, username: true, avatar: true },
        },
        post: true,
      },
    });
    if (!comment) throw new NotFoundException("Comment not found");
    return comment;
  }

  async update(userId: string, id: string, dto: UpdateCommentDto) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException("Comment not found");
    if (comment.authorId !== userId)
      throw new ForbiddenException("You can only edit your own comment");

    return this.prisma.comment.update({
      where: { id },
      data: {
        content: dto.content!,
      },
    });
  }

  async remove(userId: string, id: string) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException("Comment not found");
    if (comment.authorId !== userId)
      throw new ForbiddenException("You can only delete your own comment");

    return this.prisma.comment.delete({ where: { id } });
  }
}
