import { Role } from "@prisma/client";
export declare class AdminEntity {
    id: string;
    username: string;
    email: string;
    role: Role;
    avatar?: string;
    createdAt: Date;
    constructor(partial: Partial<AdminEntity>);
}
