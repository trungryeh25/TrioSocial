import { PrismaService } from "@prisma/prisma.module";
import { AdminCreateUserDto } from "./user/dto/admin-create-user.dto";
import { AdminUpdateUserDto } from "./user/dto/admin-update-user.dto";
import { AdminEntity } from "./user/entities/admin-user.entity";
export declare class AdminService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: AdminCreateUserDto): Promise<AdminEntity>;
    findAll(): Promise<AdminEntity[]>;
    findById(id: string): Promise<AdminEntity>;
    findByEmail(email: string): Promise<AdminEntity | null>;
    update(id: string, data: AdminUpdateUserDto): Promise<AdminEntity>;
    remove(id: string): Promise<AdminEntity>;
}
