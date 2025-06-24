import { Role } from "@prisma/client";
export declare class AdminCreateUserDto {
    username: string;
    email: string;
    password: string;
    role?: Role;
    avatar?: string;
}
