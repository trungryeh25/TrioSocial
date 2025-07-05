export interface Notification {
  id: string;
  type: string;
  message: string;
  userId: string;
  recipientId: string;
  isRead: boolean;
  createdAt: string;
}
