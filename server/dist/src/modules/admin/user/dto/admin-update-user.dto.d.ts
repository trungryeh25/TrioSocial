import { Role } from "@prisma/client";
export declare class AdminUpdateUserDto {
    email?: string;
    username?: string;
    password?: string;
    role?: Role;
    avatar?: string;
}
