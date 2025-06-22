import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // Create a new notif (admin/system user)
  @Post()
  create(@Body() dto: CreateNotificationDto) {
    return this.notificationService.create(dto);
  }

  // Get all of the notification's user 
  @Get('user/:userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.notificationService.findAllByUser(userId);
  }

  // Mark as read
  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(id);
  }

  // Delete notif
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(id);
  }
}