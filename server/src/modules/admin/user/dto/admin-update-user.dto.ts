import { IsEmail, IsOptional, IsString, IsEnum, MinLength } from "class-validator";
import { Role } from "@prisma/client";

export class AdminUpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsEnum(Role, { message: "Role must be either USER or ADMIN" })
  role?: Role;

  @IsOptional()
  @IsString()
  avatar?: string;
}
