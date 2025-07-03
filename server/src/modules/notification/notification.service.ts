import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { NotificationGateway } from "./gateway/notification.gateway";
import { CreateNotificationDto } from "./dto/create-notification.dto";

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gateway: NotificationGateway
  ) {}

  async create(dto: CreateNotificationDto) {
    const notification = await this.prisma.notification.create({
      data: {
        type: dto.type,
        message: dto.message,
        user: { connect: { id: dto.actionId } },
        recipient: { connect: { id: dto.recipientId } },
      },
    });

    this.gateway.sendNotification(dto.recipientId, notification);
    return notification;
  }

  async findAllByUser(actionId: string) {
    return this.prisma.notification.findMany({
      where: { recipientId: actionId },
      orderBy: { createdAt: "desc" },
    });
  }

  async markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async remove(id: string) {
    const noti = await this.prisma.notification.findUnique({ where: { id } });
    if (!noti) throw new NotFoundException("Notification not found");
    return this.prisma.notification.delete({ where: { id } });
  }
}
