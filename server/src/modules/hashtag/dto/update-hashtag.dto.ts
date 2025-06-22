import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateHashtagDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  name?: string;
}
