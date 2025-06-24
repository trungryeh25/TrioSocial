// 📁 src/modules/admin/user/dto/admin-create-user.dto.ts

import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { Role } from "@prisma/client";

export class AdminCreateUserDto {
  @IsString()
  username!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsEnum(Role, { message: "Role must be either USER or ADMIN" })
  role?: Role;

  @IsOptional()
  @IsString()
  avatar?: string;
}
