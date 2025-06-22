import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string='';

  @IsNotEmpty()
  @IsString()
  content: string='';

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hashtags?: string[];
}
