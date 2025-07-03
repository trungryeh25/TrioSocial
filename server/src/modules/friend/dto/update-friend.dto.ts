import { IsEnum } from 'class-validator';
import { FriendStatus } from '../../../common/entities/friend-status.enum';

export class UpdateFriendStatusDto {
  @IsEnum(FriendStatus)
  status!: FriendStatus;
}
