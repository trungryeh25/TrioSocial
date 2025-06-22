import { IsString, Length } from 'class-validator';

export class CreateHashtagDto {
  @IsString()
  @Length(1, 50)
  name!: string;
}
