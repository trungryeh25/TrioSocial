import { PrismaService } from "@prisma/prisma.module";
import { AdminCreateUserDto } from "./dto/admin-create-user.dto";
import { AdminUpdateUserDto } from "./dto/admin-update-user.dto";
import { UserEntity } from "@common/entities/user.entity";
export declare class AdminUserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: AdminCreateUserDto): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findById(id: string): Promise<UserEntity | null>;
    findByIdOrThrow(id: string): Promise<UserEntity>;
    update(id: string, data: AdminUpdateUserDto): Promise<UserEntity>;
    remove(id: string): Promise<UserEntity>;
}
