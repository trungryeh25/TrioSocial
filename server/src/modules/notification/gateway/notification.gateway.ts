import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: { origin: "*" },
})
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  private connectedUsers: Map<string, string> = new Map();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.connectedUsers.delete(client.id);
  }

  @SubscribeMessage("register")
  handleRegister(
    @MessageBody() userId: string,
    @ConnectedSocket() client: Socket
  ) {
    this.connectedUsers.set(client.id, userId);
    console.log(`User ${userId} registered with socket ${client.id}`);
  }

  sendNotification(userId: string, notification: any) {
    for (const [socketId, uid] of this.connectedUsers.entries()) {
      if (uid === userId) {
        this.server.to(socketId).emit("notification", notification);
      }
    }
  }
}
