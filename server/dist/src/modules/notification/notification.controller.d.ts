import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
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
