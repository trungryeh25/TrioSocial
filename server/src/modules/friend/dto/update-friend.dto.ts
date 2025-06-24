import { IsEnum } from 'class-validator';
import { FriendStatus } from '../interfaces/friend-status.enum';

export class UpdateFriendStatusDto {
  @IsEnum(FriendStatus)
  status!: FriendStatus;
}
