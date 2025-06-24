import { IsUUID } from "class-validator";

export class CreateFriendDto {
  @IsUUID()
  friendId!: string;
}
