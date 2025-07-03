import { PrismaService } from '@prisma/prisma.service';
import { NotificationGateway } from './gateway/notification.gateway';
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationService {
    private readonly prisma;
    private readonly gateway;
    constructor(prisma: PrismaService, gateway: NotificationGateway);
    create(dto: CreateNotificationDto): Promise<{
        createdAt: Date;
        id: string;
        userId: string;
        type: string;
        message: string;
        recipientId: string;
        isRead: boolean;
    }>;
    findAllByUser(userId: string): Promise<{
        createdAt: Date;
        id: string;
        userId: string;
        type: string;
        message: string;
        recipientId: string;
        isRead: boolean;
    }[]>;
    markAsRead(id: string): Promise<{
        createdAt: Date;
        id: string;
        userId: string;
        type: string;
        message: string;
        recipientId: string;
        isRead: boolean;
    }>;
    remove(id: string): Promise<{
        createdAt: Date;
        id: string;
        userId: string;
        type: string;
        message: string;
        recipientId: string;
        isRead: boolean;
    }>;
}
