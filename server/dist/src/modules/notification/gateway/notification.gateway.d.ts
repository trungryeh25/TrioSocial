import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateNotificationDto } from '../dto/create-notification.dto';
export declare class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private connectedUsers;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleRegister(userId: string, client: Socket): void;
    sendNotification(userId: string, notification: CreateNotificationDto): void;
}
