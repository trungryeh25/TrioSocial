import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { PrismaModule } from '@prisma/prisma.module';
import { NotificationGateway } from './gateway/notification.gateway';

@Module({
  imports: [PrismaModule],
  providers: [NotificationService, NotificationGateway],
  controllers: [NotificationController]
})
export class NotificationModule {}
