import { IsString, IsOptional, IsNotEmpty } from "class-validator";

export class CreateNotificationDto {
  @IsString()
  type!: string;

  @IsString()
  message!: string;

  @IsString()
  recipientId!: string;

  @IsOptional()
  @IsString()
  postId?: string;

  @IsNotEmpty()
  @IsString()
  actionId?: string;

  @IsString()
  userId!: string;
}
