import { IsOptional, IsString, IsUrl, Length } from "class-validator";

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    @Length(3, 30)
    username?: string;

    @IsOptional()
    @IsString()
    @Length(3, 160)
    bio?: string;

    @IsOptional()
    @IsUrl()
    avatar?: string;
}