export declare class NotificationEntity {
    id: string;
    recipientId: string;
    message: string;
    link?: string;
    isRead: boolean;
    createdAt: Date;
    constructor(partial: Partial<NotificationEntity>);
}
